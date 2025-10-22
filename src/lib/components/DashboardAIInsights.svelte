<script lang="ts">
  import { Brain, TriangleAlert as AlertTriangle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  
  export let loading = false;
  export let error: string | null = null;
  export let insight: {
    summary: string;
    walkAnalysis: {
      [key: string]: {
        score: string;
        trend: string;
        keyIssues: string[];
        quickWins: string[];
      };
    };
    sqcdpeAnalysis: {
      [key: string]: {
        status: string;
        trend: string;
        keyIssue: string;
        action: string;
      };
    };
    criticalPoints: Array<{
      point: string;
      severity: 'high' | 'medium' | 'low';
      category: string;
      category: string;
    }>;
    recommendations: Array<{
      text: string;
      priority: 'High' | 'Medium' | 'Low';
      category: string;
      impact: string;
      timeframe: string;
      category: string;
      timeframe: string;
    }>;
    actionItems: Array<{
      description: string;
      category: string;
      priority: 'high' | 'medium' | 'low';
      owner: string;
      timeline: string;
    }>;
  } | null = null;

  export let onAnalyze: () => void;
  export let onRefresh: () => void;
  
  let expanded = false;
</script>

<div class="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <Brain class="w-5 h-5 text-purple-600" />
      </div>
      <div>
        <h3 class="text-lg font-medium text-gray-900">AI Overview</h3>
        <p class="text-sm text-gray-500">Analysis and recommendations</p>
      </div>
    </div>
    
    {#if !insight && !loading}
      <button
        class="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white 
               rounded-lg hover:bg-purple-600 transition-colors"
        on:click={onAnalyze}
      >
        <Brain class="w-5 h-5" />
        <span>Analyze Data</span>
      </button>
    {:else if insight}
      <div class="flex items-center space-x-2">
        <button
          class="flex items-center space-x-2 px-4 py-2 bg-purple-100 
                 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
          on:click={onRefresh}
          disabled={loading}
        >
          <RefreshCw class="w-5 h-5 {loading ? 'animate-spin' : ''}" />
          <span>Refresh</span>
        </button>
        
        <button
          class="text-gray-400 hover:text-gray-600 transition-colors"
          on:click={() => expanded = !expanded}
        >
          {#if expanded}
            <ChevronUp class="w-5 h-5" />
          {:else}
            <ChevronDown class="w-5 h-5" />
          {/if}
        </button>
      </div>
    {/if}
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-8">
      <div class="animate-pulse flex items-center space-x-2 text-purple-600">
        <Brain class="w-5 h-5" />
        <span>Analyzing dashboard data...</span>
      </div>
    </div>
  {:else if error}
    <div class="bg-red-50 rounded-lg p-4 flex items-start space-x-3">
      <AlertTriangle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <p class="text-sm text-red-600">{error}</p>
    </div>
  {:else if insight && expanded}
    <div transition:slide class="space-y-6">
      <!-- Summary -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">Summary</h4>
        <p class="text-gray-600">{insight.summary}</p>
      </div>

      <!-- Walk Analysis -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">Walk Analysis</h4>
        <div class="space-y-4">
          {#each Object.entries(insight.walkAnalysis) as [type, data]}
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-medium uppercase">{type}</h5>
                <span class="px-2 py-1 rounded-full text-xs font-medium
                  {data.trend === 'improving' ? 'bg-green-100 text-green-800' :
                   data.trend === 'declining' ? 'bg-red-100 text-red-800' :
                   'bg-yellow-100 text-yellow-800'}">
                  {data.score}
                </span>
              </div>
              
              {#if data.keyIssues.length > 0}
                <div class="mt-2">
                  <p class="text-sm font-medium text-gray-700">Key Issues:</p>
                  <ul class="list-disc list-inside text-sm text-gray-600">
                    {#each data.keyIssues as issue}
                      <li>{issue}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
              
              {#if data.quickWins.length > 0}
                <div class="mt-2">
                  <p class="text-sm font-medium text-gray-700">Quick Wins:</p>
                  <ul class="list-disc list-inside text-sm text-gray-600">
                    {#each data.quickWins as win}
                      <li>{win}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Critical Points -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">Critical Points</h4>
        <div class="space-y-3">
          {#each insight.criticalPoints as point}
            <div class="flex items-start space-x-3 bg-white rounded-lg p-4">
              <div class="flex-1">
                <p class="text-gray-700">{point.point}</p>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                  {point.severity === 'high' ? 'bg-red-100 text-red-800' :
                   point.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-green-100 text-green-800'}">
                  {point.severity.charAt(0).toUpperCase() + point.severity.slice(1)} Severity
                </span>
                <span class="text-xs text-gray-500 ml-2">{point.category}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Recommendations -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
        <div class="space-y-3">
          {#each insight.recommendations as rec}
            <div class="flex items-start space-x-3 bg-white rounded-lg p-4">
              <div class="flex-1">
                <p class="text-gray-700">{rec.text}</p>
                <div class="mt-2 flex items-center space-x-4 text-sm">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    {rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                     rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                     'bg-green-100 text-green-800'}">
                    {rec.priority} Priority
                  </span>
                  <span class="text-gray-500">Category: {rec.category}</span>
                  <span class="text-gray-500">Timeline: {rec.timeframe}</span>
                  <span class="text-gray-500">Impact: {rec.impact}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- SQCDPE+ Analysis -->
      <div>
        <h4 class="text-sm font-medium text-gray-700">SQCDPE+ Analysis</h4>
        <div class="space-y-4 mt-2">
          {#each Object.entries(insight.sqcdpeAnalysis) as [category, data]}
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-medium capitalize">{category}</h5>
                <span class="px-2 py-1 rounded-full text-xs font-medium
                  {data.status === 'green' ? 'bg-green-100 text-green-800' :
                   data.status === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-red-100 text-red-800'}">
                  {data.trend}
                </span>
              </div>
              
              <div class="mt-2 space-y-2">
                <div class="text-sm text-gray-700"><strong>Key Issue:</strong> {data.keyIssue}</div>
                <div class="text-sm text-gray-700"><strong>Action:</strong> {data.action}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Action Items -->
      <div>
        <h4 class="text-sm font-medium text-gray-700">Action Items</h4>
        <div class="space-y-2 mt-2">
          {#each insight.actionItems as item}
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <div class="flex items-center justify-between">
                <p class="text-gray-700">{item.description}</p>
                <span class="px-2 py-1 rounded-full text-xs font-medium
                  {item.priority === 'high' ? 'bg-red-100 text-red-800' :
                   item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-green-100 text-green-800'}">
                  {item.priority}
                </span>
              </div>
              <div class="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span>Category: {item.category}</span>
                <span>Assign to: {item.owner}</span>
                <span>Timeline: {item.timeline}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else if insight}
    <p class="text-sm text-gray-500">Click to expand and view the full analysis</p>
  {/if}
</div>