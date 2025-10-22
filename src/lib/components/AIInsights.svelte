<script lang="ts">
  import { Brain, TriangleAlert as AlertTriangle, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { _ } from 'svelte-i18n';
  import type { AIInsight } from '$lib/services/ai';
  
  export let insight: AIInsight | null = null;
  export let loading = false;
  export let error: string | null = null;
  
  let expanded = false;
</script>

<div class="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <Brain class="w-5 h-5 text-purple-600" />
      </div>
      <div>
        <h3 class="text-lg font-medium text-gray-900">{$_('checkin.aiInsights')}</h3>
        <p class="text-sm text-gray-500">{$_('checkin.aiAnalysis')}</p>
      </div>
    </div>
    
    {#if insight}
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
    {/if}
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-8">
      <div class="animate-pulse flex items-center space-x-2 text-purple-600">
        <Brain class="w-5 h-5" />
        <span>{$_('checkin.analyzing')}</span>
      </div>
    </div>
  {:else if error}
    <div class="bg-red-50 rounded-lg p-4 flex items-start space-x-3">
      <AlertTriangle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <p class="text-sm text-red-600">{error}</p>
    </div>
  {:else if insight && expanded}
    <div transition:slide class="space-y-6">
      <!-- Observation -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">{$_('audit.observation')}</h4>
        <p class="text-gray-600">{insight.observation}</p>
      </div>

      <!-- Analysis -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">{$_('audit.analysis')}</h4>
        <p class="text-gray-600">{insight.analysis}</p>
      </div>

      <!-- Recommendations -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">{$_('audit.recommendations')}</h4>
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
                  <span class="text-gray-500">Impact: {rec.impact}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Follow-up Questions -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-2">{$_('audit.followUpQuestions')}</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          {#each insight.followUp as question}
            <li>{question}</li>
          {/each}
        </ul>
      </div>
    </div>
  {:else if insight}
    <p class="text-sm text-gray-500">{$_('audit.clickToExpandAnalysis')}</p>
  {/if}
</div>