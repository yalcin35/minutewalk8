<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Chart, type ChartConfiguration } from 'chart.js/auto';
  import { supabase } from '$lib/supabase';
  import { browser } from '$app/environment';
  import { slide } from 'svelte/transition';
  import { format, subDays, startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek, isValid, isSameDay } from 'date-fns';
  import { Info, Calendar, ChevronDown, Building2, BarChart2, LineChart, Table2, Activity } from 'lucide-svelte';
  import { writable, derived } from 'svelte/store';
  import { user } from '$lib/supabase';

  export let selectedSite: string | null = null;
  export let selectedDepartment: string | null = null;
  export let startDate: Date | null = null;
  export let endDate: Date | null = null;
  export let onSiteChange: ((siteId: string | null) => void) | null = null;
  export let onDateRangeChange: ((range: { from: Date; to: Date }) => void) | null = null;

  // Initialize state variables at the top
  let selectedDateRange = '30days';
  let selectedView: 'line' | 'bar' | 'table' = 'line';
  let selectedCategory = 'all';
  let showCalendar = false;
  let chartCanvas: HTMLCanvasElement | null = null;
  let chart: Chart | undefined;
  let loading = true;
  let error: string | null = null;
  let noData = false;
  let sites: Array<{ id: string; name: string }> = [];
  let abortController: AbortController | null = null;
  let auditsData: any[] = [];
  let processedData: any[] = [];

  // Date range state
  let dateRange = {
    from: startDate || subDays(new Date(), 30),
    to: endDate || new Date()
  };

  // Create reactive stores for filter state
  const filters = writable({
    site: selectedSite,
    department: selectedDepartment,
    dateRange: selectedDateRange,
    category: 'all',
    view: 'line',
    startDate: startDate,
    endDate: endDate
  });

  // Define audit types and their colors
  const auditTypes = [
    { id: 'all', label: 'All Types', color: '#6366f1' },
    { id: '5s', label: '5S Walks', color: '#3b82f6' },
    { id: 'gemba', label: 'Gemba Walks', color: '#10b981' },
    { id: 'mhe', label: 'MHE Walks', color: '#f59e0b' },
    { id: 'hse', label: 'HSE Walks', color: '#ef4444' }
  ];

  // Debounce function to prevent too many chart redraws
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Handle date range changes
  function handleDateRangeChange(range: { from: Date; to: Date }) {
    dateRange = range;
    startDate = range.from;
    endDate = range.to;
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
    
    filters.update(f => ({
      ...f,
      startDate: range.from,
      endDate: range.to
    }));
    
    // Trigger data load when date range changes
    debouncedLoadData();
  }

  // Handle predefined date ranges
  function handleDateRangeSelect(range: string) {
    selectedDateRange = range;
    const today = new Date();
    let newRange = { from: dateRange.from, to: dateRange.to };
    
    switch (range) {
      case '7days':
        newRange = { from: subDays(today, 7), to: today };
        break;
      case '30days':
        newRange = { from: subDays(today, 30), to: today };
        break;
      case 'thisMonth':
        newRange = { from: startOfMonth(today), to: today };
        break;
      case 'lastMonth':
        const lastMonth = subMonths(today, 1);
        newRange = {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        };
        break;
      case 'custom':
        // Don't update dates when switching to custom, wait for user input
        showCalendar = true;
        return;
    }
    
    showCalendar = false;
    handleDateRangeChange(newRange);
  }

  function handleStartDateChange(event: Event) {
    const newDate = new Date((event.target as HTMLInputElement).value);
    if (!isNaN(newDate.getTime())) {
      dateRange = { ...dateRange, from: newDate };
      selectedDateRange = 'custom';
      handleDateRangeChange(dateRange);
    }
  }

  function handleEndDateChange(event: Event) {
    const newDate = new Date((event.target as HTMLInputElement).value);
    if (!isNaN(newDate.getTime())) {
      dateRange = { ...dateRange, to: newDate };
      selectedDateRange = 'custom';
      handleDateRangeChange(dateRange);
    }
  }

  function formatDateRange() {
    if (isSameDay(dateRange.from, dateRange.to)) {
      return format(dateRange.from, 'MMM d, yyyy');
    }
    return `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
  }

  // Handle site change
  function handleSiteChange(event: Event) {
    const newSiteId = (event.target as HTMLSelectElement).value;
    selectedSite = newSiteId || null;
    if (onSiteChange) {
      onSiteChange(newSiteId || null);
    }
    
    filters.update(f => ({
      ...f,
      site: newSiteId || null
    }));
    
    // Trigger data load when site changes
    debouncedLoadData();
  }

  // Handle category change
  function handleCategoryChange(value: string) {
    selectedCategory = value;
    filters.update(f => ({
      ...f,
      category: value
    }));
    
    // We don't need to refetch data here, just reprocess and redraw
    if (auditsData.length > 0) {
      processChartData(auditsData);
    }
  }

  // Handle view change
  function handleViewChange(view: 'line' | 'bar' | 'table') {
    selectedView = view;
    filters.update(f => ({
      ...f,
      view
    }));
    
    // No need to refetch data, just redraw the chart
    if (processedData.length > 0) {
      createOrUpdateChart(processedData);
    }
  }

  onMount(async () => {
    try {
      // Load sites for the user's company
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', currentUser.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      const { data: sitesData } = await supabase
        .from('sites')
        .select('id, name')
        .eq('company_id', profile.company_id);

      sites = sitesData || [];

      // Set a default startDate and endDate if not provided
      if (!startDate || !endDate) {
        handleDateRangeSelect('30days');
      }

      // Load initial data
      await loadChartData();
    } catch (e) {
      console.error('Error loading sites:', e);
      error = e instanceof Error ? e.message : 'Failed to load sites';
      loading = false;
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
    
    // Cleanup any pending requests
    if (abortController) {
      abortController.abort();
    }
  });

  // Watch for changes in filter props
$: {
    if (browser && $user && selectedDateRange && (selectedSite !== undefined || selectedDepartment !== undefined)) {
        // Use a debounced version to prevent too many fetches
        if (selectedDateRange !== 'custom' || (dateRange.from && dateRange.to)) {
            debouncedLoadData();
        }
    }
}

  // Create a debounced version of loadChartData
  const debouncedLoadData = debounce(() => loadChartData(), 300);

  async function loadChartData() {
    if (!browser || !$user) return;
    
    loading = true;
    error = null;
    noData = false;

    // Cancel any previous request
    if (abortController) {
      abortController.abort();
    }
    
    // Create new abort controller for this request
    abortController = new AbortController();

    try {
      console.log('Loading chart data with filters:', {
        site: selectedSite,
        department: selectedDepartment,
        startDate: dateRange.from,
        endDate: dateRange.to,
        category: selectedCategory
      });
      
      // Get user's profile with company_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', $user.id)
        .single();

      if (profileError) throw profileError;
      
      if (!profile?.company_id) throw new Error('Company not found');

      // Build query for audits with join to audit_setups
      let query = supabase
        .from('audits')
        .select(`
          id,
          created_at,
          data,
          company_id,
          setup_id,
          audit_setups!inner (
            audit_type,
            site_id,
            department_id
          )
        `)
        .eq('company_id', profile.company_id);
      
      // Apply filters if provided
      if (selectedSite) {
        query = query.eq('audit_setups.site_id', selectedSite);
      }
      if (selectedDepartment) {
        query = query.eq('audit_setups.department_id', selectedDepartment);
      }
      if (dateRange.from) {
        query = query.gte('created_at', dateRange.from.toISOString());
      }
      if (dateRange.to) {
        query = query.lte('created_at', dateRange.to.toISOString());
      }

      // Order by created_at
      query = query.order('created_at', { ascending: true });

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw fetchError;
      }
      
      console.log('Fetched audits:', data?.length || 0);

      if (!data || data.length === 0) {
        noData = true;
        loading = false;
        return;
      }

      // Transform the data to match the expected format
      const transformedData = data.map(audit => ({
        ...audit,
        audit_type: audit.audit_setups.audit_type,
        site_id: audit.audit_setups.site_id,
        department_id: audit.audit_setups.department_id
      }));

      // Store the raw data
      auditsData = transformedData;
      
      // Process the data for visualization
      processChartData(transformedData);
      
    } catch (e) {
      // Only show error if it's not due to the request being aborted
      if (e.name !== 'AbortError') {
        console.error('Error loading chart data:', e);
        error = e instanceof Error ? e.message : 'Failed to load chart data';
      }
    } finally {
      loading = false;
    }
  }

  function processChartData(data: any[]) {
    // Group audits by date and type
    const dateData = new Map();
    
    let validDataFound = false;

    data.forEach(audit => {
      // Check if we should include this audit type
      if (selectedCategory !== 'all' && audit.audit_type !== selectedCategory) {
        return;
      }
      
      // Check if data and score exists and is a number
      if (audit.data && typeof audit.data.score === 'number') {
        validDataFound = true;
        const dateStr = format(new Date(audit.created_at), 'yyyy-MM-dd');
        
        if (!dateData.has(dateStr)) {
          dateData.set(dateStr, {
            date: dateStr,
            target: 90
          });
        }
        
        const dayData = dateData.get(dateStr);
        const type = audit.audit_type || '5s'; // Default to 5s if type is missing
        
        if (!dayData[type]) {
          dayData[type] = [];
        }
        
        dayData[type].push(audit.data.score);
        
        // Also add to "all" category
        if (!dayData['all']) {
          dayData['all'] = [];
        }
        dayData['all'].push(audit.data.score);
      }
    });
    
    // If no valid data entries were found
    if (!validDataFound) {
      noData = true;
      loading = false;
      return;
    }

    // Calculate averages for each date
    let chartData = Array.from(dateData.entries()).map(([date, data]) => {
      const result: any = { date };
      
      auditTypes.forEach(type => {
        const scores = data[type.id];
        if (scores && scores.length > 0) {
          result[type.id] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        } else {
          result[type.id] = null;
        }
      });
      
      result.target = 90;
      return result;
    });

    // Sort by date
    chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (chartData.length === 0) {
      noData = true;
      loading = false;
      return;
    }

    // Store processed data
    processedData = chartData;

    // Create or update chart with data
    setTimeout(() => {
      if (chartCanvas) {
        createOrUpdateChart(chartData);
      }
    }, 0);
  }

  function createOrUpdateChart(data: any[]) {
    if (!chartCanvas) return;
    
    if (chart) {
      chart.destroy();
    }

    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    console.log('Creating chart with data:', data);
    
    // Filter datasets based on selected category
    let displayDatasets = [];
    
    if (selectedCategory === 'all') {
      // Show all audit types
      displayDatasets = auditTypes.filter(type => type.id !== 'all').map(type => ({
        label: type.label,
        data: data.map(d => d[type.id] || null),
        borderColor: type.color,
        backgroundColor: selectedView === 'bar' ? type.color + '40' : type.color + '10',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5
      }));
    } else {
      // Only show selected category
      const selectedType = auditTypes.find(t => t.id === selectedCategory);
      if (selectedType) {
        displayDatasets = [{
          label: selectedType.label,
          data: data.map(d => d[selectedCategory] || null),
          borderColor: selectedType.color,
          backgroundColor: selectedView === 'bar' ? selectedType.color + '40' : selectedType.color + '10',
          fill: false,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        }];
      }
    }
    
    // Add target line
    displayDatasets.push({
      label: 'Target',
      data: data.map(() => 90), 
      borderColor: '#dc2626',
      borderDash: [5, 5],
      fill: false,
      pointRadius: 0,
      borderWidth: 1
    });

    const config: ChartConfiguration = {
      type: selectedView === 'bar' ? 'bar' : 'line',
      data: {
        labels: data.map(d => format(new Date(d.date), 'MMM d')),
        datasets: displayDatasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300 // Faster animations
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 60,
            max: 100,
            grid: { 
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              callback: (value) => value + '%',
              font: {
                size: 11
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              },
              maxRotation: 45,
              minRotation: 0
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'center',
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 15,
              font: {
                size: 11,
                family: 'Inter'
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1f2937',
            titleFont: {
              size: 12,
              weight: '600',
              family: 'Inter'
            },
            bodyColor: '#4b5563',
            bodyFont: {
              size: 11,
              family: 'Inter'
            },
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y !== null ? context.parsed.y.toFixed(1) + '%' : 'No data';
                return `${label}: ${value}`;
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    };

    // Modify configuration based on selected view
    if (selectedView === 'bar') {
      config.type = 'bar';
      config.data.datasets.forEach((dataset, index) => {
        if (dataset.label !== 'Target') {
          dataset.borderRadius = 4;
          dataset.borderWidth = 0;
          dataset.maxBarThickness = 12;
        }
      });
    }

    chart = new Chart(ctx, config);
  }

  // Create table view of the data if selected
  function renderTableView() {
    if (!processedData || processedData.length === 0) return null;
    
    return {
      dates: processedData.map(item => format(new Date(item.date), 'MMM d, yyyy')),
      data: processedData
    };
  }

  // Format date helper
  function formatDate(date: Date): string {
    return format(date, 'MMM d, yyyy');
  }
</script>

<div class="bg-white rounded-xl shadow-lg p-4">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
    <h3 class="text-lg font-medium text-gray-900">Performance Trend</h3>
    
    <div class="flex flex-wrap items-center gap-2">
      <!-- Category Selector -->
      <div class="relative">
        <select
          bind:value={selectedCategory}
          on:change={(e) => handleCategoryChange(e.currentTarget.value)}
          class="h-8 px-2 text-sm rounded-lg border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
        >
          {#each auditTypes as type}
            <option value={type.id}>{type.label}</option>
          {/each}
        </select>
        <ChevronDown class="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>

      <!-- Site Selector -->
      {#if sites.length > 0}
        <div class="flex items-center space-x-2">
          <Building2 class="w-4 h-4 text-gray-500" />
          <select
            value={selectedSite || ''}
            on:change={handleSiteChange}
            class="h-8 px-2 text-sm rounded-lg border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500"
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
          class="h-8 px-2 text-sm rounded-lg border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          bind:value={selectedDateRange}
          on:change={(e) => handleDateRangeSelect(e.currentTarget.value)}
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

      <!-- View Toggle -->
      <div class="flex items-center rounded-lg border border-gray-200 p-0.5">
        <button
          class="p-1.5 rounded {selectedView === 'line' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}"
          on:click={() => handleViewChange('line')}
        >
          <LineChart class="w-4 h-4" />
        </button>
        <button
          class="p-1.5 rounded {selectedView === 'bar' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}"
          on:click={() => handleViewChange('bar')}
        >
          <BarChart2 class="w-4 h-4" />
        </button>
        <button
          class="p-1.5 rounded {selectedView === 'table' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}"
          on:click={() => handleViewChange('table')}
        >
          <Table2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
  
  {#if loading}
    <div class="flex items-center justify-center h-[300px]">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-indigo-200 border-t-indigo-500"></div>
    </div>
  {:else if error}
    <div class="flex flex-col items-center justify-center h-[300px] text-red-500">
      <p>Error: {error}</p>
      <button 
        class="mt-2 text-sm text-indigo-600 hover:text-indigo-800" 
        on:click={() => loadChartData()}
      >
        Try Again
      </button>
    </div>
  {:else if noData}
    <div class="flex flex-col items-center justify-center h-[300px] text-gray-500">
      <Activity class="w-10 h-10 text-gray-400 mb-2" />
      <p>No audit data available for the selected filters.</p>
      <p class="text-sm text-gray-400 mt-1">Try adjusting your filters or date range.</p>
    </div>
  {:else}
    {#if selectedView === 'table'}
      <div class="w-full h-[300px] overflow-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50">Date</th>
              {#each auditTypes.filter(type => selectedCategory === 'all' || type.id === selectedCategory || type.id === 'all') as type}
                {#if type.id !== 'all' || selectedCategory === 'all'}
                  <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50">
                    {type.label}
                  </th>
                {/if}
              {/each}
              <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50">
                Target
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each processedData as row}
              <tr class="hover:bg-gray-50">
                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(row.date), 'MMM d, yyyy')}
                </td>
                {#each auditTypes.filter(type => selectedCategory === 'all' || type.id === selectedCategory || type.id === 'all') as type}
                  {#if type.id !== 'all' || selectedCategory === 'all'}
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium" 
                        style="color: {row[type.id] < 90 ? '#ef4444' : '#10b981'}">
                      {row[type.id] !== null ? row[type.id].toFixed(1) + '%' : '-'}
                    </td>
                  {/if}
                {/each}
                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  90%
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <div class="w-full h-[300px]">
        <canvas bind:this={chartCanvas}></canvas>
      </div>
    {/if}
  {/if}
</div>