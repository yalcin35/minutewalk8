<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Activity, TrendingUp, TrendingDown, ArrowRight, Calendar, ChevronDown, Building2, Info
  } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { format, subDays, startOfMonth, endOfMonth, subMonths, isSameDay } from 'date-fns';

  export let siteId: string | null = null;
  export let departmentId: string | null = null;
  export let onSiteChange: ((siteId: string | null) => void) | null = null;

  // Constants for scoring calculation
  const MAX_POINTS_PER_QUESTION = 5;
  const QUESTIONS_PER_CATEGORY = 5;
  const TOTAL_QUESTIONS = 25;

  let loading = true;
  let error: string | null = null;
  let sites: Array<{ id: string; name: string }> = [];
  let score = 0;
  let previousScore = 0;
  let breakdown: Array<{
    category: string;
    score: number;
    trend: 'up' | 'down' | 'stable';
  }> = [];
  
  let companyId: string | null = null;
  let dateRange = {
    from: subDays(new Date(), 30),
    to: new Date()
  };
  let selectedDateRange = '30days';
  let showCalendar = false;
  const debugMode = true;

  // Better reactive statement that properly tracks dependencies
  $: if (companyId && siteId !== undefined) {
    if (debugMode) console.log('Filters changed - reloading data', { 
      siteId, 
      fromDate: dateRange.from.toISOString(), 
      toDate: dateRange.to.toISOString() 
    });
    loadPerformanceData();
  }

  // Added reactive statement for date range changes
  $: if (dateRange && companyId) {
    if (debugMode) console.log('Date range changed - reloading data', dateRange);
    loadPerformanceData();
  }

  onMount(async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error('Not authenticated');

      if (debugMode) console.log('User authenticated:', user.id);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile?.company_id) throw new Error('Company not found');
      
      if (debugMode) console.log('Company ID found:', profile.company_id);
      companyId = profile.company_id;

      const { data: sitesData, error: sitesError } = await supabase
        .from('sites')
        .select('id, name')
        .eq('company_id', companyId);
      

      if (sitesError) throw sitesError;
      sites = sitesData || [];
      
      if (debugMode) console.log('Sites loaded:', sites);

      // Important: Only call loadPerformanceData once here, then let reactive statements handle updates
      await loadPerformanceData();
      
    } catch (e) {
      console.error('Error loading initial data:', e);
      error = e instanceof Error ? e.message : 'Failed to load initial data';
      loading = false;
    }
  });

  async function loadPerformanceData() {
    if (!companyId) return;
    
    try {
      loading = true;
      error = null;

      // Convert dates with proper timezone handling
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);

      if (debugMode) {
        console.log('Fetching data for:', {
          siteId,
          from: fromDate.toISOString(),
          to: toDate.toISOString()
        });
      }

      // Base query with all filters and join with audit_setups
      let query = supabase
        .from('audits')
        .select(`
          data,
          created_at,
          setup_id,
          audit_setups!inner (
            site_id,
            audit_type
          )
        `)
        .eq('company_id', companyId)
        .gte('created_at', fromDate.toISOString())
        .lte('created_at', toDate.toISOString());

      if (siteId) {
        query = query.eq('audit_setups.site_id', siteId);
      }
      if (departmentId) {
        query = query.eq('audit_setups.department_id', departmentId);
      }

      const { data: currentAudits, error: auditError } = await query;
      
      // Debug logging before error check
      if (debugMode) {
        console.log('Audit query result:', { 
          success: !auditError, 
          count: currentAudits?.length,
          error: auditError
        });
      }
      
      if (auditError) throw auditError;

      if (debugMode) {
        console.log('Fetched current audits:', currentAudits);
      }

      // Calculate current score
      score = 0;
      if (currentAudits?.length) {
        // Calculate score as percentage of maximum possible points
        score = currentAudits.reduce((sum, audit) => sum + (Number(audit.data?.score) || 0), 0) / currentAudits.length;
      }

      // Calculate previous period
      const periodDuration = toDate.getTime() - fromDate.getTime();
      const previousFrom = new Date(fromDate.getTime() - periodDuration);
      const previousTo = new Date(toDate.getTime() - periodDuration);

      // Previous period query with same filters and join
      let prevQuery = supabase
        .from('audits')
        .select(`
          data,
          created_at,
          setup_id,
          audit_setups!inner (
            site_id,
            audit_type
          )
        `)
        .eq('company_id', companyId)
        .gte('created_at', previousFrom.toISOString())
        .lte('created_at', previousTo.toISOString());

      if (siteId) {
        prevQuery = prevQuery.eq('audit_setups.site_id', siteId);
      }

      const { data: previousAudits, error: prevError } = await prevQuery;
      
      if (prevError && debugMode) {
        console.warn('Previous period query error (non-fatal):', prevError);
      }
      
      if (debugMode) {
        console.log('Fetched previous audits:', previousAudits);
      }
      
      // Calculate previous score
      previousScore = 0;
      if (previousAudits?.length) {
        // Calculate previous score as percentage
        previousScore = previousAudits.reduce((sum, audit) => sum + (Number(audit.data?.score) || 0), 0) / previousAudits.length;
      }

      // Calculate breakdown
      const auditTypes = ['5s', 'hse', 'mhe', 'gemba'];
      breakdown = [];
      
      for (const type of auditTypes) {
        const typeAudits = currentAudits?.filter(audit => audit.audit_setups.audit_type === type) || [];
        if (!typeAudits.length) continue;

        // Calculate type score as percentage
        const typeScore = typeAudits.reduce((sum, audit) => sum + (Number(audit.data?.score) || 0), 0) / typeAudits.length;

        const prevTypeAudits = previousAudits?.filter(audit => audit.audit_setups.audit_type === type) || [];
        const prevTypeScore = prevTypeAudits.length ?
          prevTypeAudits.reduce((sum, audit) => sum + (Number(audit.data?.score) || 0), 0) / prevTypeAudits.length : 0;

        breakdown.push({
          category: type.toUpperCase(),
          score: Math.round(typeScore),
          trend: prevTypeAudits.length ? 
            (typeScore > prevTypeScore ? 'up' : typeScore < prevTypeScore ? 'down' : 'stable') : 
            'stable'
        });
      }

      if (debugMode) {
        console.log('Calculated data:', {
          score,
          previousScore,
          breakdown
        });
      }

    } catch (e: any) {
      console.error('Data load error:', e);
      error = `Failed to load data: ${e.message}`;
      score = 0;
      previousScore = 0;
      breakdown = [];
    } finally {
      // Important: Always update loading state
      loading = false;
    }
  }

  function handleDateRangeChange(range: string) {
    const today = new Date();
    selectedDateRange = range;
    let from: Date;
    let to: Date = today;

    switch (range) {
      case '7days':
        from = subDays(today, 7);
        break;
      case '30days':
        from = subDays(today, 30);
        break;
      case 'thisMonth':
        from = startOfMonth(today);
        break;
      case 'lastMonth':
        const lastMonth = subMonths(today, 1);
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
      default:
        from = subDays(today, 30);
    }
    
    // Set date range - reactive statement will handle the data reload
    dateRange = { from, to };
  }

  function formatDateRange() {
    if (isSameDay(dateRange.from, dateRange.to)) {
      return format(dateRange.from, 'MMM d, yyyy');
    }
    return `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
  }

  async function handleSiteChange(event: Event) {
    const newSiteId = (event.target as HTMLSelectElement).value;
    siteId = newSiteId || null;
    if (onSiteChange) {
      await onSiteChange(siteId);
    }
    // Data will reload via reactive statement
  }

  function handleStartDateChange(event: Event) {
    const newDate = new Date((event.target as HTMLInputElement).value);
    if (!isNaN(newDate.getTime())) {
      dateRange = { ...dateRange, from: newDate };
      selectedDateRange = 'custom';
      // Data will reload via reactive statement
    }
  }

  function handleEndDateChange(event: Event) {
    const newDate = new Date((event.target as HTMLInputElement).value);
    if (!isNaN(newDate.getTime())) {
      dateRange = { ...dateRange, to: newDate };
      selectedDateRange = 'custom';
      // Data will reload via reactive statement
    }
  }

  function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-500 bg-green-50'; 
    if (score >= 80) return 'text-yellow-500 bg-yellow-50'; 
    return 'text-red-500 bg-red-50';
  }

  function getTrendIcon(trend: 'up' | 'down' | 'stable') {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return ArrowRight;
    }
  }
</script>

<div class="bg-white rounded-xl shadow-lg overflow-hidden">
  <!-- Header -->
  <div class="p-4 border-b">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <h3 class="text-lg font-medium text-gray-900 flex items-center space-x-2">
        <Activity class="w-5 h-5 text-blue-500" />
        <span>Overall Performance</span>
      </h3>

      <div class="flex flex-wrap items-center gap-2">
        <!-- Site Selector -->
        {#if sites.length > 0}
          <div class="flex items-center space-x-2">
            <Building2 class="w-4 h-4 text-gray-500" />
            <select
              class="h-8 px-2 text-sm rounded-lg border-gray-200 bg-white focus:ring-2 focus:ring-blue-500"
              value={siteId || ''}
              on:change={handleSiteChange}
            >
              <option value="">All Sites</option>
              {#each sites as site}
                <option value={site.id}>{site.name}</option>
              {/each}
            </select>
          </div>
        {/if}

<!-- Date Range Selector -->
<div class="flex items-center space-x-2">
  <select
    class="h-8 px-2 text-sm rounded-lg border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
    bind:value={selectedDateRange}
    on:change={(e) => handleDateRangeChange(e.currentTarget.value)}
  >
    <option value="7days">Last 7 days</option>
    <option value="30days">Last 30 days</option>
    <option value="thisMonth">This month</option>
    <option value="lastMonth">Last month</option>
    <option value="custom">Custom</option>
  </select>

  <div class="relative">
    <div
      on:click={() => showCalendar = !showCalendar}
      class="h-8 px-3 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50
            flex items-center space-x-1 cursor-pointer min-w-[120px] max-w-[180px]"
    >
      <Calendar class="w-4 h-4 text-gray-500 shrink-0" />
      <span class="truncate">{formatDateRange()}</span>
      <ChevronDown class="w-4 h-4 text-gray-400 shrink-0" />
    </div>

    {#if showCalendar}
      <div class="absolute top-full right-0 mt-1 p-2 bg-white border rounded-lg shadow-lg z-10 flex flex-col sm:flex-row items-center gap-2">
        <div class="flex items-center gap-1">
          <span class="text-sm whitespace-nowrap">From:</span>
          <input
            type="date"
            class="p-1 text-xs border rounded"
            value={dateRange.from.toISOString().split('T')[0]}
            on:change={handleStartDateChange}
          />
        </div>
        <div class="flex items-center gap-1">
          <span class="text-sm whitespace-nowrap">To:</span>
          <input
            type="date"
            class="p-1 text-xs border rounded"
            value={dateRange.to.toISOString().split('T')[0]}
            on:change={handleEndDateChange}
          />
        </div>
      </div>
    {/if}
  </div>
</div>
      </div>
    </div>
  </div>

  {#if loading}
    <div class="p-8 flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
    </div>
  {:else if error}
    <div class="p-4 text-red-600 bg-red-50">
      {error}
    </div>
  {:else}
    <!-- Main Score -->
    {#if score === 0 && breakdown.length === 0}
      <div class="p-8 text-center">
        <div class="flex justify-center mb-4">
          <Info class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No Walk Data Found</h3>
        <p class="text-gray-500">There are no walks recorded for the selected period.</p>
      </div>
    {:else}
      <div class="p-6 border-b bg-gradient-to-br from-blue-50 to-indigo-50">
        <div class="flex items-baseline justify-between">
          <div class="flex flex-col">
            <div class="text-5xl font-bold text-gray-900">
              {score.toFixed(1)}
              <span class="text-3xl">%</span>
            </div>
            <div class="flex items-center mt-2 space-x-1" class:invisible={score === previousScore}>
              {#if score > previousScore}
                <TrendingUp class="w-5 h-5 text-green-500" />
                <span class="text-sm font-medium text-green-600">
                  +{(score - previousScore).toFixed(1)}% from previous
                </span>
              {:else if score < previousScore}
                <TrendingDown class="w-5 h-5 text-red-500" />
                <span class="text-sm font-medium text-red-600">
                  {(score - previousScore).toFixed(1)}% from previous
                </span>
              {:else}
                <ArrowRight class="w-5 h-5 text-gray-500" />
                <span class="text-sm font-medium text-gray-600">No change</span>
              {/if}
            </div>
            <div class="text-xs text-gray-500 mt-1">
              {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="px-3 py-1 rounded-full text-sm font-medium
                     {score >= 90 ? 'bg-green-100 text-green-800' :
                      score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}"
            >
              {score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>

      <!-- Breakdown -->
      {#if breakdown.length > 0}
        <div class="p-4">
          <div class="space-y-3">
            {#each breakdown as item}
              <div class="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50">
                <div class="flex items-center space-x-3">
                  <svelte:component 
                    this={getTrendIcon(item.trend)} 
                    class="w-4 h-4 {item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-500'}" 
                  />
                  <span class="font-medium text-gray-700">{item.category}</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="px-3 py-1 rounded-full {getScoreColor(item.score)}">
                    {item.score.toFixed(1)}%
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="p-4 text-center text-gray-500">
          No breakdown data available for the selected period.
        </div>
      {/if}
    {/if}
  {/if}
</div>