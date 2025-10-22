<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { Shield, BadgeCheck, DollarSign, Truck, Users, Leaf, Plus, ArrowUp, ArrowDown, ArrowRight, MessageSquare, TriangleAlert as AlertTriangle, Calendar, MapPin, Clock, Building2 } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { user } from '$lib/supabase';

  interface CategoryData {
    status: 'green' | 'yellow' | 'red';
    count: number;
    trend: 'up' | 'down' | 'stable';
    comments: Array<{
      note: string;
      created_at: string;
      user_name?: string;
    }>;
    actionItems: number;
    completedActions: number;
  }

  export let siteId: string | null = null;
  export let departmentId: string | null = null;
  export let startDate: Date | null = null;
  export let endDate: Date | null = null;
  export let selectedShift = 'all';

  let selectedDateRange = '30days'; 
  let showDatePicker = false;
  let customStartDate = '';
  let customEndDate = '';
  let sites: Array<{ id: string; name: string }> = [];
  let departments: Array<{ id: string; name: string; site_id: string }> = [];
  let abortController: AbortController | null = null;

  let loading = true;
  let error: string | null = null;
  let categoryData: Record<string, CategoryData> = {};

  // Filter departments based on selected site
  $: filteredDepartments = departments.filter(
    dept => !siteId || dept.site_id === siteId
  );

  // Create a reactive statement to watch for filter changes
  $: filterTrigger = JSON.stringify({
    siteId,
    departmentId,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    selectedShift
  });

  const dispatch = createEventDispatcher<{
    dataUpdate: Record<string, CategoryData>;
  }>();

  // Watch for filter changes
  $: if (browser && filterTrigger) {
    loadData();
  }

  const categories = [
    { id: 'safety', label: 'Safety', icon: Shield, color: 'red' },
    { id: 'quality', label: 'Quality', icon: BadgeCheck, color: 'blue' },
    { id: 'cost', label: 'Cost', icon: DollarSign, color: 'yellow' },
    { id: 'delivery', label: 'Delivery', icon: Truck, color: 'green' },
    { id: 'people', label: 'People', icon: Users, color: 'purple' },
    { id: 'environment', label: 'Environment', icon: Leaf, color: 'emerald' },
    { id: 'plus', label: 'Plus (+)', icon: Plus, color: 'gray' }
  ];


  onMount(async () => {
    try {
      // Load sites for the user's company
      const { data: userData } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', userData.user?.id)
        .single();
      
      if (!profile?.company_id) throw new Error('Company not found');

      // Fetch sites and departments
      const [{ data: sitesData }, { data: deptsData }] = await Promise.all([
        supabase
        .from('sites')
        .select('id, name')
         .eq('company_id', profile.company_id),
        supabase
          .from('departments')
          .select('id, name, site_id')
          .eq('company_id', profile.company_id)
      ]);

      if (sitesData) sites = sitesData;
      if (deptsData) departments = deptsData;

      // Initial data load
      await loadData();
    } catch (e) {
      console.error('Error loading sites:', e);
    }
  });

  function handleDateRangeSelect(range: string) {
    selectedDateRange = range;
    const today = new Date();
    let newStartDate: Date;
    let newEndDate = today;

    if (range === 'custom') {
      showDatePicker = true;
      return;
    }

    switch (range) {
      case '7days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 7);
        break;
      case '30days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 30);
        break;
      case 'thisMonth':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        newStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 30);
    }

    startDate = newStartDate;
    endDate = newEndDate;
  }

  async function loadData() {
    loading = true;
    error = null;
    
    // Initialize categoryData with empty values for each category
    categories.forEach(cat => {
      categoryData[cat.id] = {
        status: 'green',
        count: 0,
        trend: 'stable',
        comments: [],
        actionItems: 0,
        completedActions: 0
      };
    });
    
    // Cancel any existing request
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', userData.user?.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Query for checkins with categories
      let query = supabase
        .from('daily_checkin_details')
        .select(`
          id,
          company_id,
          site_id,
          department_id,
          created_by,
          shift_date,
          shift_type,
          start_time,
          end_time,
          notes,
          created_at,
          updated_at,
          creator_name,
          creator_email,
          checkin_categories (
            category,
            status,
            notes,
            created_at
          ),
          checkin_actions (
            category,
            status
          )
        `)
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (siteId) {
        query = query.eq('site_id', siteId);
      }
      if (departmentId) {
        query = query.eq('department_id', departmentId);
      }
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('created_at', endDate.toISOString());
      }

      if (selectedShift !== 'all') {
        query = query.eq('shift_type', selectedShift);
      }

      const { data: checkinsData, error: checkinsError } = await query;

      if (checkinsError) throw checkinsError;

      // Initialize categoryData with empty values
      categories.forEach(cat => {
        const catData = {
          status: 'green' as const,
          count: 0,
          trend: 'stable' as const,
          comments: [],
          actionItems: 0,
          completedActions: 0
        };
        categoryData[cat.id] = catData;
      });

      // Process data for each category
      categories.forEach(cat => {
        if (checkinsData) {
          // Count statuses
          let greenCount = 0;
          let yellowCount = 0;
          let redCount = 0;

          checkinsData.forEach(checkin => {
            const categories = checkin.checkin_categories || [];
            const catStatus = categories.find(c => c.category === cat.id)?.status;
            if (catStatus === 'green') greenCount++;
            if (catStatus === 'yellow') yellowCount++;
            if (catStatus === 'red') redCount++;

            // Get notes
            const catNote = categories.find(c => c.category === cat.id);
            if (catNote?.notes) {
              categoryData[cat.id].comments.push({
                note: catNote.notes,
                created_at: catNote.created_at,
                user_name: checkin.creator_name
              });
            }

            // Count actions
            const actions = (checkin.checkin_actions || []).filter(a => a.category === cat.id);
            categoryData[cat.id].actionItems += actions.length;
            categoryData[cat.id].completedActions += actions.filter(a => a.status === 'completed').length;
          });

          // Determine overall status
          if (redCount > 0) {
            categoryData[cat.id].status = 'red';
          } else if (yellowCount > greenCount) {
            categoryData[cat.id].status = 'yellow';
          }

          categoryData[cat.id].count = greenCount + yellowCount + redCount;

          // Determine trend (simplified for example)
          if (greenCount > (yellowCount + redCount)) {
            categoryData[cat.id].trend = 'up';
          } else if (redCount > 0) {
            categoryData[cat.id].trend = 'down';
          }
        }
      });

      // Dispatch updated data
      dispatch('dataUpdate', categoryData);
    } catch (e) {
      console.error('Error loading SQCDPE+ data:', e);
      error = e instanceof Error ? e.message : 'Failed to load data';
    } finally {
      loading = false;
      abortController = null;
    }
  }

  function getStatusColor(status: 'green' | 'yellow' | 'red'): string {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  function getStatusBgColor(status: 'green' | 'yellow' | 'red'): string {
    switch (status) {
      case 'green': return 'bg-green-50';
      case 'yellow': return 'bg-yellow-50';
      case 'red': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  }

  function getTrendIcon(trend: 'up' | 'down' | 'stable') {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return ArrowRight;
    }
  }

  function getTrendColor(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  }
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex flex-col space-y-4 mb-6">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-medium text-gray-900">SQCDPE+ Overview</h2>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-4">
      <!-- Date Range Filter -->
      <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
        <Calendar class="w-4 h-4 text-gray-500" />
        <select
          bind:value={selectedDateRange}
          class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
          on:change={(e) => handleDateRangeSelect(e.currentTarget.value)}
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="thisMonth">This month</option>
          <option value="lastMonth">Last month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
      
      {#if showDatePicker}
        <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
          <input 
            type="date" 
            bind:value={customStartDate} 
            class="text-sm bg-transparent border-none focus:ring-0 p-0" 
          />
          <span>to</span>
          <input 
            type="date" 
            bind:value={customEndDate} 
            class="text-sm bg-transparent border-none focus:ring-0 p-0" 
          />
          <button
            class="text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition-colors"
            on:click={() => {
              if (customStartDate && customEndDate) {
                startDate = new Date(customStartDate);
                endDate = new Date(customEndDate);
                showDatePicker = false;
              }
            }}
          >
            Apply
          </button>
        </div>
      {/if}

      <!-- Shift Filter -->
      <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
        <Clock class="w-4 h-4 text-gray-500" />
        <select
          bind:value={selectedShift}
          class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
        >
          <option value="all">All Shifts</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="night">Night</option>
        </select>
      </div>

      <!-- Site Filter -->
      {#if sites.length > 0}
        <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
          <MapPin class="w-4 h-4 text-gray-500" />
          <select
            bind:value={siteId}
            class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
          >
            <option value="">All Sites</option>
            {#each sites as site}
              <option value={site.id}>{site.name}</option>
            {/each}
          </select>
        </div>
      {/if}

      <!-- Department Filter -->
      {#if filteredDepartments.length > 0}
        <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
          <Building2 class="w-4 h-4 text-gray-500" />
          <select
            bind:value={departmentId}
            class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
            disabled={!siteId}
          >
            <option value="">All Departments</option>
            {#each filteredDepartments as department}
              <option value={department.id}>{department.name}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>
  </div>

  {#if loading}
    <div class="flex items-center justify-center h-48">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else if error}
    <div class="bg-red-50 text-red-600 rounded-lg p-4">
      {error}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each categories as category}
        {@const data = categoryData[category.id]}
        {#if data}
          <div class="bg-white rounded-lg border shadow-sm overflow-hidden">
            <!-- Header -->
            <div class="p-4 border-b bg-gray-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class={`p-2 rounded-lg bg-${category.color}-100`}>
                    <svelte:component this={category.icon} class={`w-5 h-5 text-${category.color}-600`} />
                  </div>
                  <h3 class="font-medium">{category.label}</h3>
                </div>
                <div class={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`} />
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 space-y-4">
              <!-- Status Summary -->
              <div class="flex items-center justify-between">
                <div class={`px-2 py-1 rounded-full text-sm ${getStatusBgColor(data.status)} ${
                  data.status === 'green' ? 'text-green-700' :
                  data.status === 'yellow' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {data.status === 'green' ? 'On Target' :
                   data.status === 'yellow' ? 'Needs Attention' :
                   'Critical'}
                </div>
                <div class="flex items-center space-x-1">
                  <svelte:component 
                    this={getTrendIcon(data.trend)} 
                    class={`w-4 h-4 ${getTrendColor(data.trend)}`} 
                  />
                  <span class="text-sm text-gray-600">
                    {data.count} checks
                  </span>
                </div>
              </div>

              <!-- Action Items -->
              {#if data.actionItems > 0}
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-1 text-gray-600">
                    <AlertTriangle class="w-4 h-4" />
                    <span>Action Items:</span>
                  </div>
                  <div class="font-medium">
                    {data.completedActions}/{data.actionItems}
                  </div>
                </div>
                
                <!-- Latest Comments -->
                {#if data.comments.length > 0}
                  <div class="mt-2 bg-gray-50 rounded-lg p-2">
                    <div class="flex items-center space-x-2 mb-1">
                      <MessageSquare class="w-4 h-4 text-gray-500" />
                      <span class="text-xs text-gray-500">
                        Latest Comments
                      </span>
                    </div>
                    <div class="space-y-2">
                      {#each data.comments.slice(0, 3).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) as comment}
                        <div class="text-sm">
                          <p class="text-gray-700">{comment.note}</p>
                          <div class="flex items-center space-x-2 mt-1">
                            <span class="text-xs text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString()} 
                              {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {#if comment.user_name}
                              <span class="text-xs text-gray-500">by {comment.user_name}</span>
                            {/if}
                          </div>
                        </div>
                      {/each}
                      {#if data.comments.length > 3}
                        <p class="text-xs text-gray-500 italic">
                          +{data.comments.length - 3} more comments
                        </p>
                      {/if}
                    </div>
                  </div>
                {/if}
              {/if}

              <!-- Progress Bar -->
              <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  class={`h-full ${getStatusColor(data.status)}`}
                  style="width: {(data.completedActions / Math.max(data.actionItems, 1)) * 100}%"
                ></div>
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>