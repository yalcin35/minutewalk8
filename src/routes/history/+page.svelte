<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { 
    History, Search, Calendar, Filter, Building2, Map, 
    ClipboardCheck, ArrowRight, Star, ChevronDown, ChevronUp, 
    File, Shield, BadgeCheck, DollarSign, Truck, Users, Leaf, Plus
  } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  // UI State
  let loading = true;
  let error: string | null = null;
  let searchQuery = '';
  let selectedTimeframe: 'all' | 'today' | 'week' | 'month' = 'all';
  let selectedSite: string = '';
  let selectedDepartment: string = '';
  let selectedType: 'audit' | 'checkin' = 'audit';
  let showFilters = false;
  let expandedCardId: string | null = null;

  // Data
  let sites: Array<{ id: string; name: string }> = [];
  let departments: Array<{ id: string; name: string; site_id: string }> = [];
  let audits: Array<{
    id: string;
    title: string;
    date: string;
    site_name: string;
    department_name: string;
    score: number;
    status: string;
    details: any;
  }> = [];
  let checkins: Array<any> = [];

  $: filteredDepartments = departments.filter(
    dept => !selectedSite || dept.site_id === selectedSite
  );

  $: filteredItems = (selectedType === 'audit' ? audits : checkins)
    .filter(item => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.site_name.toLowerCase().includes(query) ||
          item.department_name.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(item => {
      // Filter by timeframe
      const itemDate = new Date(item.date);
      const now = new Date();
      
      if (selectedTimeframe === 'today') {
        return itemDate.toDateString() === now.toDateString();
      } else if (selectedTimeframe === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return itemDate >= oneWeekAgo;
      } else if (selectedTimeframe === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= oneMonthAgo;
      }
      return true;
    })
    .filter(item => {
      // Filter by site
      if (selectedSite) {
        return item.details.site_id === selectedSite;
      }
      return true;
    })
    .filter(item => {
      // Filter by department
      if (selectedDepartment) {
        return item.details.department_id === selectedDepartment;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

  onMount(async () => {
    try {
      // Get user's company
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Fetch sites and departments
      const [{ data: sitesData }, { data: deptsData }, { data: checkinsData }] = await Promise.all([
        supabase
          .from('sites')
          .select('*')
          .eq('company_id', profile.company_id),
        supabase
          .from('departments')
          .select('*')
          .eq('company_id', profile.company_id),
        supabase
          .from('daily_checkins')
          .select(`
            id,
            site_id,
            department_id,
            shift_date,
            shift_type,
            notes,
            created_at,
            created_by,
            sites (name),
            departments (name),
            checkin_categories (
              category,
              status,
              notes
            ),
            checkin_actions (
              category,
              description,
              priority,
              status
            )
          `)
          .eq('company_id', profile.company_id)
          .order('created_at', { ascending: false })
      ]);

      if (sitesData) sites = sitesData;
      if (deptsData) departments = deptsData;
      if (checkinsData) checkins = checkinsData;

      // Fetch audit history with correct joins
      const { data: auditData, error: auditError } = await supabase
        .from('audit_history')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (auditError) throw auditError;

      // Process audit data
      audits = (auditData || []).map(audit => ({
        id: audit.audit_id,
        title: `${audit.audit_type.toUpperCase()} Audit`,
        date: audit.created_at,
        site_name: audit.site_name || 'Unknown Site',
        department_name: audit.department_name || 'Unknown Department',
        score: audit.data?.score || 0,
        status: 'completed',
        details: {
          ...audit,
          type: 'audit',
          site_id: audit.site_id,
          department_id: audit.department_id
        }
      }));

    } catch (e) {
      console.error('Error loading history:', e);
      error = e instanceof Error ? e.message : 'Failed to load history';
    } finally {
      loading = false;
    }
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function toggleCardDetails(id: string) {
    expandedCardId = expandedCardId === id ? null : id;
  }

  function getScoreColor(score: number): string {
    if (score >= 4) return 'text-green-500';
    if (score >= 3) return 'text-yellow-500';
    return 'text-red-500';
  }

  function getStatusColor(status: 'green' | 'yellow' | 'red'): string {
    switch (status) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'safety': return Shield;
      case 'quality': return BadgeCheck;
      case 'cost': return DollarSign;
      case 'delivery': return Truck;
      case 'people': return Users;
      case 'environment': return Leaf;
      case 'plus': return Plus;
      default: return ClipboardCheck;
    }
  }

  function handleViewDetails(item: any) {
    if (selectedType === 'audit') {
      localStorage.setItem('currentAuditData', JSON.stringify(item));
      goto('/audit/detail');
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
          <History class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-2xl font-light text-gray-900">Activity History</h1>
          <p class="text-gray-500">View past audits and meetings</p>
        </div>
      </div>
      <a
        href="/dashboard"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 
               transition-colors flex items-center space-x-2 text-gray-700"
      >
        <span>Back to Dashboard</span>
        <ArrowRight class="w-4 h-4 transform rotate-180" />
      </a>
    </div>

    <!-- Type Selection -->
    <div class="flex space-x-4 mb-6">
      <button
        class="px-4 py-2 rounded-lg transition-colors {selectedType === 'audit' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        on:click={() => selectedType = 'audit'}
      >
        <div class="flex items-center space-x-2">
          <ClipboardCheck class="w-5 h-5" />
          <span>Audits</span>
        </div>
      </button>
      
      <button
        class="px-4 py-2 rounded-lg transition-colors {selectedType === 'checkin' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        on:click={() => selectedType = 'checkin'}
      >
        <div class="flex items-center space-x-2">
          <Plus class="w-5 h-5" />
          <span>SQCDPE+</span>
        </div>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <!-- Search and Type Filters -->
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            bind:value={searchQuery}
            class="block w-full pl-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search history..."
          />
        </div>

        <!-- Time Filter -->
        <div>
          <select
            bind:value={selectedTimeframe}
            class="w-full md:w-40 px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>

        <!-- Filter Button -->
        <button
          class="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-600 
                 rounded-lg hover:bg-indigo-200 transition-colors"
          on:click={() => showFilters = !showFilters}
        >
          <Filter class="w-5 h-5" />
          <span>More Filters</span>
          <svelte:component 
            this={showFilters ? ChevronUp : ChevronDown}
            class="w-4 h-4"
          />
        </button>
      </div>

      <!-- Advanced Filters -->
      {#if showFilters}
        <div 
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
          transition:slide={{ duration: 200 }}
        >
          <!-- Site Selection -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Map class="w-4 h-4" />
              <span>Site</span>
            </label>
            <select
              bind:value={selectedSite}
              class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Sites</option>
              {#each sites as site}
                <option value={site.id}>{site.name}</option>
              {/each}
            </select>
          </div>

          <!-- Department Selection -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building2 class="w-4 h-4" />
              <span>Department</span>
            </label>
            <select
              bind:value={selectedDepartment}
              disabled={!selectedSite}
              class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Departments</option>
              {#each filteredDepartments as department}
                <option value={department.id}>{department.name}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}
    </div>

    <!-- Content -->
    {#if loading}
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    {:else if error}
      <div class="bg-red-50 text-red-600 rounded-xl p-4">
        {error}
      </div>
    {:else if filteredItems.length === 0}
      <div class="bg-white rounded-xl shadow-lg p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <File class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No {selectedType === 'audit' ? 'audit' : 'SQCDPE+'} history found
        </h3>
        <p class="text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredItems as item (item.id)}
          <div 
            class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
            transition:fade={{ duration: 200 }}
          >
            <!-- Card Header -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <div class="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                    {#if selectedType === 'audit'}
                      <ClipboardCheck class="w-5 h-5 text-blue-600" />
                    {:else}
                      <Plus class="w-5 h-5 text-blue-600" />
                    {/if}
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900 line-clamp-1">
                      {selectedType === 'audit' ? item.title : `${item.shift_type} Shift Check-in`}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {formatDate(selectedType === 'audit' ? item.date : item.created_at)}
                    </p>
                  </div>
                </div>
                
                <div 
                  class="px-2 py-1 rounded-full text-xs font-medium 
                         bg-green-100 text-green-800"
                >
                  {selectedType === 'audit' ? item.status : item.shift_type}
                </div>
              </div>
            </div>
            
            <!-- Card Content -->
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                  <Map class="w-4 h-4" />
                  <span>
                    {selectedType === 'audit' ? item.site_name : item.sites.name}
                  </span>
                </div>
                
                {#if selectedType === 'audit'}
                  <div class="flex items-center space-x-1">
                    <Star class={`w-4 h-4 ${getScoreColor(item.score || 0)}`} />
                    <span class={`text-lg ${getScoreColor(item.score || 0)}`}>
                      {item.score ? item.score.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                {/if}
              </div>
              
              <div class="text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <Building2 class="w-4 h-4" />
                  <span>
                    {selectedType === 'audit' ? item.department_name : item.departments.name}
                  </span>
                </div>
              </div>
              
              {#if selectedType === 'checkin' && item.checkin_categories}
                <div class="border-t border-gray-100 pt-4 space-y-2">
                  <div class="grid grid-cols-2 gap-2">
                    {#each item.checkin_categories as category}
                      <div class="flex items-center space-x-2">
                        <svelte:component this={getCategoryIcon(category.category)} class="w-4 h-4 text-gray-600" />
                        <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                          {category.status}
                        </span>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <!-- Expandable Details Section -->
              {#if expandedCardId === item.id}
                <div transition:slide={{ duration: 200 }} class="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <h4 class="font-medium text-gray-800">Details</h4>
                  <div class="space-y-2">
                    {#if selectedType === 'audit'}
                      <p class="text-sm text-gray-600">
                        <span class="font-medium">Audit Type:</span> {item.details.audit_type}
                      </p>
                      <p class="text-sm text-gray-600">
                        <span class="font-medium">Created By:</span> {item.details.full_name || item.details.email}
                      </p>
                      <p class="text-sm text-gray-600">
                        <span class="font-medium">Critical Issues:</span> {item.details.data.critical_issues || 0}
                      </p>
                    {:else}
                      {#if item.notes}
                        <p class="text-sm text-gray-600">
                          <span class="font-medium">Notes:</span> {item.notes}
                        </p>
                      {/if}
                      {#if item.checkin_actions?.length}
                        <div class="mt-4">
                          <h5 class="text-sm font-medium text-gray-700 mb-2">Action Items</h5>
                          <div class="space-y-2">
                            {#each item.checkin_actions as action}
                              <div class="bg-gray-50 p-2 rounded-lg">
                                <p class="text-sm text-gray-600">{action.description}</p>
                                <div class="flex items-center space-x-2 mt-1">
                                  <span class="text-xs font-medium text-gray-500">{action.category}</span>
                                  <span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{action.status}</span>
                                </div>
                              </div>
                            {/each}
                          </div>
                        </div>
                      {/if}
                    {/if}
                  </div>
                </div>
              {/if}
              
              <!-- Action Buttons -->
              <div class="flex justify-between pt-2">
                <button
                  class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1"
                  on:click={() => toggleCardDetails(item.id)}
                >
                  <svelte:component 
                    this={expandedCardId === item.id ? ChevronUp : ChevronDown}
                    class="w-4 h-4"
                  />
                  <span>{expandedCardId === item.id ? 'Less Details' : 'More Details'}</span>
                </button>
                
                {#if selectedType === 'audit'}
                  <button
                    class="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                    on:click={() => handleViewDetails(item.details)}
                  >
                    <span>View Full Details</span>
                    <ArrowRight class="w-4 h-4" />
                  </button>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>