<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { 
    Star, 
    Calendar, 
    User, 
    Image as ImageIcon,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    Brain
  } from 'lucide-svelte';
  import type { AIInsight } from '$lib/types/ai';

  export let questionId: number;
  export let previousAnswers: Array<{
    rating: number;
    photos: string[];
    notes: string;
    created_at: string;
    aiInsight?: AIInsight;
    user: {
      full_name: string;
      email: string;
    };
  }>;

  let expanded = false;
  let expandedPhotoUrl: string | null = null;

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getScoreColor(score: number): string {
    if (score >= 4) return 'text-green-500';
    if (score >= 3) return 'text-yellow-500';
    return 'text-red-500';
  }
</script>

{#if previousAnswers.length > 0}
  <div class="mt-4">
    <button
      class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl
             hover:bg-gray-100 transition-colors"
      on:click={() => expanded = !expanded}
    >
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1">
          <Star class="w-5 h-5 {getScoreColor(previousAnswers[0].rating)}" />
          <span class="text-2xl font-light {getScoreColor(previousAnswers[0].rating)}">
            {previousAnswers[0].rating}
          </span>
        </div>
        
        <div class="text-sm text-gray-500">
          Previous score from {previousAnswers[0].user.full_name}
        </div>
      </div>

      <svelte:component 
        this={expanded ? ChevronUp : ChevronDown}
        class="w-5 h-5 text-gray-400"
      />
    </button>

    {#if expanded}
      <div 
        class="mt-4 space-y-6 bg-white rounded-xl p-6 shadow-sm"
        transition:slide
      >
        <!-- Latest Submission -->
        <div class="space-y-6">
          {#if previousAnswers[0].photos.length > 0}
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <ImageIcon class="w-4 h-4" />
                <span>Evidence Photos</span>
              </label>
              <div class="grid grid-cols-3 gap-2">
                {#each previousAnswers[0].photos as photo}
                  <button
                    class="aspect-square rounded-lg overflow-hidden bg-gray-100 relative
                           hover:opacity-90 transition-opacity"
                    on:click={() => expandedPhotoUrl = photo}
                  >
                    <img
                      src={photo}
                      alt="Previous audit evidence"
                      class="w-full h-full object-cover"
                    />
                  </button>
                {/each}
              </div>
            </div>
          {/if}

          {#if previousAnswers[0].notes}
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <MessageSquare class="w-4 h-4" />
                <span>Notes</span>
              </label>
              <p class="text-gray-600 text-sm">
                {previousAnswers[0].notes}
              </p>
            </div>
          {/if}

          {#if previousAnswers[0].aiInsight}
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Brain class="w-4 h-4" />
                <span>AI Review</span>
              </label>
              <div class="bg-purple-50 rounded-lg p-4 space-y-4">
                <p class="text-sm text-gray-600">
                  {previousAnswers[0].aiInsight.observation}
                </p>
                {#if previousAnswers[0].aiInsight.recommendations.length > 0}
                  <div class="space-y-2">
                    <h4 class="text-sm font-medium text-gray-700">Recommendations:</h4>
                    <ul class="space-y-2">
                      {#each previousAnswers[0].aiInsight.recommendations as rec}
                        <li class="text-sm text-gray-600">
                          {rec.text}
                          <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                            {rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                             rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                             'bg-green-100 text-green-800'}">
                            {rec.priority}
                          </span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>
            </div>
          {/if}

          <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <Calendar class="w-4 h-4" />
              <span>{formatDate(previousAnswers[0].created_at)}</span>
            </div>
            <div class="flex items-center space-x-2">
              <User class="w-4 h-4" />
              <span>{previousAnswers[0].user.full_name}</span>
            </div>
          </div>
        </div>

        <!-- Previous Submissions -->
        {#if previousAnswers.length > 1}
          <div class="border-t border-gray-100 pt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-4">Previous Submissions</h4>
            <div class="space-y-4">
              {#each previousAnswers.slice(1) as submission}
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-1">
                      <Star class="w-4 h-4 {getScoreColor(submission.rating)}" />
                      <span class="font-medium {getScoreColor(submission.rating)}">
                        {submission.rating}
                      </span>
                    </div>
                    <span class="text-sm text-gray-500">
                      by {submission.user.full_name}
                    </span>
                  </div>
                  <span class="text-sm text-gray-500">
                    {formatDate(submission.created_at)}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<!-- Photo Modal -->
{#if expandedPhotoUrl}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    on:click={() => expandedPhotoUrl = null}
    transition:fade={{ duration: 200 }}
  >
    <img
      src={expandedPhotoUrl}
      alt="Expanded evidence"
      class="max-w-full max-h-full rounded-lg"
      on:click|stopPropagation
    />
  </div>
{/if}