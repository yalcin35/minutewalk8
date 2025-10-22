<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import SQCDPEOverview from '$lib/components/SQCDPEOverview.svelte';
  import { Calendar, MapPin, ClipboardCheck, Shield, Truck, Orbit } from 'lucide-svelte';
  import { user, isLoading } from '$lib/supabase';
  import PerformanceWidget from '$lib/components/PerformanceWidget.svelte';
  import PerformanceTrendChart from '$lib/components/PerformanceTrendChart.svelte';
  import DashboardAIInsights from '$lib/components/DashboardAIInsights.svelte';
  import ActivityCalendar from '$lib/components/ActivityCalendar.svelte';
  import AuditDistributionChart from '$lib/components/AuditDistributionChart.svelte';
  import WalkCalendar from '$lib/components/WalkCalendar.svelte';
  // Import the Sidebar component
  import Sidebar from '$lib/components/Sidebar.svelte';

  // Add a state variable for sidebar visibility
  let sidebarOpen = true;

  // Color configurations
  const auditColors = {
    '5s': { bg: 'rgba(59, 130, 246, 0.8)', border: 'rgb(59, 130, 246)' },
    'hse': { bg: 'rgba(239, 68, 68, 0.8)', border: 'rgb(239, 68, 68)' },
    'mhe': { bg: 'rgba(249, 115, 22, 0.8)', border: 'rgb(249, 115, 22)' },
    'gemba': { bg: 'rgba(34, 197, 94, 0.8)', border: 'rgb(34, 197, 94)' }
  };

  // Main dashboard filters (affects Performance overview and AI insights)
  let selectedSiteId: string | null = null;
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  let selectedDateRange = '30days';
  let selectedShift = 'all';
  
  // Analysis grid filters (affects only the analysis grid charts)
  let analysisSiteId: string | null = null;
  let analysisStartDate: Date | null = null;
  let analysisEndDate: Date | null = null;
  let analysisDateRange = '30days';
  let analysisDepartmentId: string | null = null;
  
  // Other state variables
  let userLevel = 5;
  let loading = true;
  let error: string | null = null;
  let insight: any = null;
  let sites: Array<{ id: string; name: string }> = [];
  let departments: Array<{ id: string; name: string; site_id: string }> = [];
  let showDatePicker = false;
  let customStartDate = '';
  let customEndDate = '';
  let categoryData: Record<string, any> = {};

  // Filter departments based on selected site
  $: filteredDepartments = departments.filter(
    dept => !analysisSiteId || dept.site_id === analysisSiteId
  );

  // Bind handler for SQCDPE+ data updates
  function handleSQCDPEDataUpdate(event: CustomEvent<Record<string, any>>) {
    categoryData = event.detail;
  }

  function handleDateRangeSelect(range: string, isAnalysis = false) {
    const today = new Date();
    
    if (isAnalysis) {
      analysisDateRange = range;
      
      if (range === 'custom') {
        showDatePicker = true;
        return;
      }
      
      // Create new Date objects to ensure reactivity
      let newStartDate: Date;
      let newEndDate: Date = new Date(today);
      
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
      
      // Assign new date objects to trigger reactivity
      analysisStartDate = newStartDate;
      analysisEndDate = newEndDate;
    } else {
      selectedDateRange = range;
      
      // Create new Date objects to ensure reactivity
      let newStartDate: Date;
      let newEndDate: Date = new Date(today);
      
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
      
      // Assign new date objects to trigger reactivity
      startDate = newStartDate;
      endDate = newEndDate;
    }
  }

  function handleSiteChange(event: Event, isAnalysis = false) {
    const select = event.target as HTMLSelectElement;
    const value = select.value || null;
    
    if (isAnalysis) {
      // Ensure the value is actually different to properly trigger reactivity
      if (analysisSiteId !== value) {
        analysisSiteId = value;
        analysisDepartmentId = null; // Reset department when site changes
      }
    } else {
      // Ensure the value is actually different to properly trigger reactivity
      if (selectedSiteId !== value) {
        selectedSiteId = value;
      }
    }
  }

  // This code can be added to the onMount function to improve date range initialization
  function initializeDateRanges() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    // Create new date objects to ensure proper reactivity
    startDate = new Date(thirtyDaysAgo);
    endDate = new Date(today);
    analysisStartDate = new Date(thirtyDaysAgo);
    analysisEndDate = new Date(today);
  }

  // Handle department change for analysis grid
  function handleDepartmentChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    analysisDepartmentId = select.value || null;
  }
  
  async function handleAnalyze() {
    loading = true;
    error = null;
    
    try {
      // Get current SQCDPE+ data - use the main dashboard filters for AI insights
      const sqcdpeData = {
        categories: categoryData,
        filters: {
          siteId: selectedSiteId,  // Use main dashboard filters
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          selectedShift  // Use main dashboard shift
        }
      };

      const response = await fetch('/dashboard/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          view: 'dashboard',
          stats: {},
          dateRange: {
            start: startDate?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            end: endDate?.toISOString() || new Date().toISOString()
          },
          sqcdpeData
        })
      });

      if (!response.ok) throw new Error('Failed to get AI insights');
      insight = await response.json();
    } catch (e) {
      console.error('Error getting AI insights:', e);
      error = e instanceof Error ? e.message : 'Failed to get AI insights';
    } finally {
      loading = false;
    }
  }

  function handleRefresh() {
    handleAnalyze();
  }

  onMount(async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', currentUser.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Load sites and departments
      const [{ data: sitesData }, { data: departmentsData }] = await Promise.all([
        supabase
          .from('sites')
          .select('id, name')
          .eq('company_id', profile.company_id),
        supabase
          .from('departments')
          .select('id, name, site_id')
          .eq('company_id', profile.company_id)
      ]);

      if (sitesData) {
        sites = sitesData;
      }
      
      if (departmentsData) {
        departments = departmentsData;
      }

      // Initialize both date ranges
      initializeDateRanges();
      
      loading = false;
    } catch (e) {
      console.error('Error loading data:', e);
      error = e instanceof Error ? e.message : 'Failed to load data';
      loading = false;
    }
  });
</script>

<div class="flex h-screen overflow-hidden">
  <!-- Include the Sidebar component -->
  <Sidebar bind:isOpen={sidebarOpen} />
  
  <!-- Main Content - Adjust margin-left based on sidebar state -->
  <div 
    class="flex-1 overflow-y-auto transition-all duration-300"
    style={`margin-left: ${sidebarOpen ? '16rem' : '5rem'}`}
  >
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
      {#if loading}
        <div class="flex items-center justify-center h-[calc(100vh-6rem)]">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      {:else if error}
        <div class="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div class="text-red-500 font-medium">Error loading dashboard: {error}</div>
          <button 
            on:click={() => location.reload()} 
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Dashboard
          </button>
        </div>
      {:else}
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- AI Insights - Uses main dashboard filters -->
          <DashboardAIInsights {insight} {loading} {error} onAnalyze={handleAnalyze} onRefresh={handleRefresh} />
        
          <!-- Performance Overview - Uses main dashboard filters -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <PerformanceWidget
              {selectedSiteId}
              {startDate}
              {endDate}
              onSiteChange={(id) => selectedSiteId = id}
              class="lg:col-span-1 w-full"
            />
            <PerformanceTrendChart
              selectedSite={selectedSiteId}
              {startDate}
              {endDate}
              class="lg:col-span-1"
            />
          </div>

          <!-- Analysis Grid - Uses analysis-specific filters -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-800">Analysis Grid</h2>
            
            <!-- Analysis Grid Filters -->
            <div class="flex flex-wrap items-center gap-4 mb-2">
              <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                <Calendar class="w-4 h-4 text-gray-500" />
                <select
                  bind:value={analysisDateRange}
                  class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
                  on:change={(e) => handleDateRangeSelect(e.currentTarget.value, true)}
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
                  <input type="date" bind:value={customStartDate} class="text-sm bg-transparent border-none focus:ring-0 p-0" />
                  <span>to</span>
                  <input type="date" bind:value={customEndDate} class="text-sm bg-transparent border-none focus:ring-0 p-0" />
                  <button
                    class="text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition-colors"
                    on:click={() => {
                      if (customStartDate && customEndDate) {
                        analysisStartDate = new Date(customStartDate);
                        analysisEndDate = new Date(customEndDate);
                        showDatePicker = false;
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              {/if}

              {#if sites.length > 0}
                <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                  <MapPin class="w-4 h-4 text-gray-500" />
                  <select
                    bind:value={analysisSiteId}
                    class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
                    on:change={(e) => handleSiteChange(e, true)}
                  >
                    <option value="">All Sites</option>
                    {#each sites as site}
                      <option value={site.id}>{site.name}</option>
                    {/each}
                  </select>
                </div>
              {/if}
              
              <!-- Department Filter -->
              <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                <select
                  bind:value={analysisDepartmentId}
                  class="text-sm bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
                  on:change={handleDepartmentChange}
                  disabled={!analysisSiteId || filteredDepartments.length === 0}
                >
                  <option value="">All Departments</option>
                  {#each filteredDepartments as department}
                    <option value={department.id}>{department.name}</option>
                  {/each}
                </select>
              </div>
            </div>

            <!-- Charts Grid - Each chart wrapped in its own div -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- 5S Analysis -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden p-4 h-full">
                <AuditDistributionChart
                  siteId={analysisSiteId}
                  startDate={analysisStartDate}
                  endDate={analysisEndDate}
                  departmentId={analysisDepartmentId}
                  title="5S Analysis"
                  auditType="5s"
                  icon={ClipboardCheck}
                  backgroundColor={auditColors['5s'].bg}
                  borderColor={auditColors['5s'].border}
                />
              </div>

              <!-- Gemba Analysis -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden p-4 h-full">
                <AuditDistributionChart
                  siteId={analysisSiteId}
                  startDate={analysisStartDate}
                  endDate={analysisEndDate}
                  departmentId={analysisDepartmentId}
                  title="Gemba Analysis"
                  auditType="gemba"
                  icon={Orbit}
                  backgroundColor={auditColors['gemba'].bg}
                  borderColor={auditColors['gemba'].border}
                />
              </div>

              <!-- MHE Analysis -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden p-4 h-full">
                <AuditDistributionChart
                  siteId={analysisSiteId}
                  startDate={analysisStartDate}
                  endDate={analysisEndDate}
                  departmentId={analysisDepartmentId}
                  title="MHE Analysis"
                  auditType="mhe"
                  icon={Truck}
                  backgroundColor={auditColors['mhe'].bg}
                  borderColor={auditColors['mhe'].border}
                />
              </div>

              <!-- HSE Analysis -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden p-4 h-full">
                <AuditDistributionChart
                  siteId={analysisSiteId}
                  startDate={analysisStartDate}
                  endDate={analysisEndDate}
                  departmentId={analysisDepartmentId}
                  title="HSE Analysis"
                  auditType="hse"
                  icon={Shield}
                  backgroundColor={auditColors['hse'].bg}
                  borderColor={auditColors['hse'].border}
                />
              </div>
            </div>
          </div>

          <!-- SQCDPE+ Overview - Uses main dashboard filters -->
          <SQCDPEOverview
            siteId={selectedSiteId}
            startDate={startDate}
            endDate={endDate}
            bind:selectedShift
            on:dataUpdate={handleSQCDPEDataUpdate}
          />

          <!-- Activity Calendar - Uses main dashboard filters -->
          <div class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ActivityCalendar siteId={selectedSiteId} departmentId={null} />
              <WalkCalendar siteId={selectedSiteId} departmentId={null} />
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>