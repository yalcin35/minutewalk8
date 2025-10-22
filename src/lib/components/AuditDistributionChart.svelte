<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { Chart, type ChartConfiguration } from 'chart.js/auto';
  import { supabase } from '$lib/supabase';
  import { browser } from '$app/environment'; 
  import { user } from '$lib/supabase';

  const MAX_POINTS_PER_QUESTION = 5;
  const QUESTIONS_PER_CATEGORY = 5;
  const TOTAL_QUESTIONS = 25;

  export let siteId: string | null = null;
  export let departmentId: string | null = null;
  export let startDate: Date | null = null;
  export let endDate: Date | null = null;
  export let title: string = '5S Analysis';
  export let auditType: string = '5s';
  export let icon: any = null;
  export let color = 'blue';
  export let chartColor = 'rgb(59, 130, 246)';
  export let backgroundColor = 'rgba(59, 130, 246, 0.8)';
  export let borderColor = 'rgb(59, 130, 246)';
  export let chartType: 'bar' | 'radar' = 'bar';

  let chartCanvas: HTMLCanvasElement | null = null;
  let chart: Chart | null = null;
  let loading = true;
  let noData = false;
  let error: string | null = null;
  let averageScore: number = 0;
  let abortController: AbortController | null = null;
  let chartData: any = null;

  const categories = {
    '5s': ['Sort', 'Set in Order', 'Shine', 'Standardize', 'Sustain'],
    'gemba': ['Process Observation', 'People Engagement', 'Visual Management', 'Problem Solving', 'Continuous Improvement'],
    'mhe': ['Equipment Condition', 'Operational Safety', 'Maintenance', 'Operator Compliance', 'Documentation'],
    'hse': ['Hazard Identification', 'Risk Assessment', 'Control Measures', 'Emergency Preparedness', 'Compliance']
  };

  $: filterTrigger = JSON.stringify({
    siteId, 
    departmentId,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    auditType
  });

  $: if (browser && $user && filterTrigger) {
    loadChartData();
  }

  $: if (chartCanvas && chartData) {
    createOrUpdateChart(chartData);
  }

  async function loadChartData() {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    
    loading = true;
    error = null;
    noData = false;

    try {      
      if (!$user) {
        throw new Error('Not authenticated');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', $user.id)
        .single();

      if (!profile?.company_id) {
        throw new Error('Failed to fetch profile');
      }

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      let query = supabase
        .from('audit_history')
        .select(`
          audit_id,
          created_at,
          data,
          audit_type,
          site_id,
          department_id
        `)
        .eq('company_id', profile.company_id)
        .eq('audit_type', auditType);

      if (siteId) query = query.eq('site_id', siteId);
      if (departmentId) query = query.eq('department_id', departmentId);
      if (start) query = query.gte('created_at', start.toISOString());
      if (end) query = query.lte('created_at', end.toISOString());

      const { data: auditData, error: fetchError } = await query;

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw fetchError;
      }

      if (!auditData || auditData.length === 0) {
        noData = true;
        if (chart) {
          chart.destroy();
          chart = null;
        }
        chartData = null;
        return;
      }

      const validCategories = categories[auditType as keyof typeof categories] || categories['5s'];
      
      const categoryScores: Record<string, { points: number; totalQuestions: number }> = {};
      validCategories.forEach(category => {
        categoryScores[category] = { points: 0, totalQuestions: 0 };
      });
      
      auditData.forEach(audit => {
        if (audit.data && audit.data.answers && Array.isArray(audit.data.answers)) {
          audit.data.answers.forEach((answer: any) => {
            if (typeof answer.rating === 'number') {
              const category = getCategoryForQuestion(answer.questionId, validCategories);
              if (category && categoryScores[category]) {
                categoryScores[category].points += answer.rating;
                categoryScores[category].totalQuestions++;
              }
            }
          });
        }
      });
      
      const labels = validCategories;
      const chartValues = validCategories.map(category => {
        const { points, totalQuestions } = categoryScores[category];
        const maxPossiblePoints = totalQuestions * MAX_POINTS_PER_QUESTION;
        return maxPossiblePoints > 0
          ? parseFloat(((points / maxPossiblePoints) * 100).toFixed(2))
          : 0;
      });

      averageScore = parseFloat((chartValues.reduce((a, b) => a + b, 0) / chartValues.length).toFixed(2));
      
      chartData = {
        labels,
        datasets: [{
          label: auditType.toUpperCase() + ' Scores',
          data: chartValues,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      };

      if (chartCanvas) {
        createOrUpdateChart(chartData);
      }

    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Error in loadChartData:', e);
        error = e instanceof Error ? e.message : 'Failed to load data';
        noData = true;
        if (chart) {
          chart.destroy();
          chart = null;
        }
        chartData = null;
      }
    } finally {
      loading = false;
      abortController = null;
    }
  }

  function getCategoryForQuestion(questionId: number, validCategories: string[]): string | null {
    const categoryIndex = Math.floor((questionId - 1) / QUESTIONS_PER_CATEGORY);
    if (categoryIndex >= 0 && categoryIndex < validCategories.length) {
      return validCategories[categoryIndex];
    }
    return null;
  }

  function createOrUpdateChart(data: any) {
    if (!chartCanvas) return;

    if (chart) {
      chart.destroy();
      chart = null;
    }

    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: chartType,
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0].label,
          data: data.datasets[0].data,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...(chartType === 'bar' ? {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`
              }
            }
          }
        } : {}),
        ...(chartType === 'radar' && {
          scale: {
            ticks: {
              beginAtZero: true,
              max: 100,
              callback: (value) => `${value}%`
            },
            pointLabels: {
              color: borderColor
            }
          }
        }),
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.formattedValue}%`
            }
          }
        }
      }
    };

    chart = new Chart(ctx, config);
  }

  afterUpdate(() => {
    if (chartCanvas && chartData && !chart) {
      createOrUpdateChart(chartData);
    }
  });

  onMount(() => {
    if (browser && $user) {
      loadChartData();
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
    if (abortController) {
      abortController.abort();
    }
  });
</script>

<div class="p-6">
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
      {#if icon}
        <svelte:component this={icon} class="w-5 h-5 text-gray-600" />
      {/if}
      <h3 class="text-lg font-medium text-gray-900">{title}</h3>
    </div>
    
    {#if !loading && !error && !noData}
      <div class="text-sm">
        <span class="font-medium">Average: </span>
        <span class="text-blue-600">{averageScore}%</span>
      </div>
    {/if}
  </div>
  
  {#if loading}
    <div class="flex items-center justify-center h-48">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else if noData}
    <div class="flex flex-col items-center justify-center h-[300px] text-gray-500">
      <p class="text-center">No {auditType.toUpperCase()} walk data available.</p>
      <p class="text-sm text-gray-400 mt-1">Try adjusting your filters or date range.</p>
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-48 text-red-500">
      <p>Error: {error}</p>
    </div>
  {:else}
    <div class="w-full h-[300px]">
      <canvas bind:this={chartCanvas}></canvas>
    </div>
  {/if}
</div>