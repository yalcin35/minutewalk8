<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { ArrowLeft, ClipboardCheck, Map, Building2, User, Calendar, Star, CircleCheck as CheckCircle, Circle as XCircle, Image, MessageSquare, Brain, TriangleAlert as AlertTriangle, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { questions } from '$lib/data/questions';
  import { hseQuestions } from '$lib/data/hse-questions';
  import { mheQuestions } from '$lib/data/mhe-questions';
  import { gembaQuestions } from '$lib/data/gemba-questions';
  import { _, locale } from 'svelte-i18n';

  let loading = true;
  let error: string | null = null;
  let auditData: any = null;
  let expandedQuestions: Record<string, boolean> = {};
  let questionMap: Record<number, string> = {};
  let currentLocale: string;

  onMount(() => {
    try {
      // Get current locale for translations
      locale.subscribe(value => {
        currentLocale = value;
      });
      
      const storedData = localStorage.getItem('currentAuditData');
      if (!storedData) {
        error = 'No audit data found';
        return;
      }

      auditData = JSON.parse(storedData);
      
      // Create a mapping of question IDs to question text based on audit type
      if (auditData.audit_type) {
        let questionList = [];
        switch (auditData.audit_type.toLowerCase()) {
          case 'hse':
            questionList = hseQuestions;
            break;
          case 'mhe':
            questionList = mheQuestions;
            break;
          case 'gemba':
            questionList = gembaQuestions;
            break;
          default:
            questionList = questions; // Default to 5S questions
        }
        
        // Create a map of question IDs to question text
        questionMap = questionList.reduce((map, q) => {
          map[q.id] = q.text;
          return map;
        }, {});
      }
      
      // Initialize expanded state for questions
      if (auditData.data?.answers) {
        auditData.data.answers.forEach((answer: any) => {
          expandedQuestions[answer.questionId] = false;
        });
      }
    } catch (e) {
      console.error('Error loading audit data:', e);
      error = e instanceof Error ? e.message : 'Failed to load audit data';
    } finally {
      loading = false;
    }
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString(currentLocale || 'en-US', {
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

  function toggleQuestionExpand(questionId: string) {
    expandedQuestions[questionId] = !expandedQuestions[questionId];
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button
          class="text-gray-600 hover:text-gray-900 transition-colors"
          on:click={() => goto('/history')}
        >
          <ArrowLeft class="w-5 h-5" />
        </button>
        
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <ClipboardCheck class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 class="text-2xl font-light text-gray-900">
              {auditData?.audit_type?.toUpperCase()} {$_('audit.details')}
            </h1>
            <p class="text-gray-500">
              {auditData ? formatDate(auditData.created_at) : $_('common.loading')}
            </p>
          </div>
        </div>
      </div>
    </div>

    {#if loading}
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else if error}
      <div class="bg-red-50 text-red-600 rounded-xl p-6 space-y-4">
        <h3 class="font-medium text-lg">{$_('error.loadingAudit')}</h3>
        <p>{error}</p>
        <button
          class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          on:click={() => goto('/history')}
        >
          {$_('button.returnToHistory')}
        </button>
      </div>
    {:else if auditData}
      <!-- Summary Card -->
      <div class="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-medium text-gray-900">{$_('audit.summary')}</h2>
          <div class="flex items-center space-x-2">
            <Star class={`w-6 h-6 ${getScoreColor(auditData.data.score || 0)}`} />
            <span class={`text-2xl font-light ${getScoreColor(auditData.data.score || 0)}`}>
              {auditData.data.score ? auditData.data.score.toFixed(1) : $_('common.notAvailable')}
            </span>
          </div>
        </div>

        <!-- Location & User -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="flex items-center space-x-2 text-gray-700">
              <Map class="w-5 h-5 text-gray-500" />
              <span>{$_('audit.site')}: {auditData.site_name}</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-700">
              <Building2 class="w-5 h-5 text-gray-500" />
              <span>{$_('audit.department')}: {auditData.department_name}</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-700">
              <ClipboardCheck class="w-5 h-5 text-gray-500" />
              <span>{$_('audit.type')}: {auditData.audit_type.toUpperCase()}</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-2 text-gray-700">
              <User class="w-5 h-5 text-gray-500" />
              <span>{$_('audit.conductedBy')}: {auditData.full_name || auditData.email}</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-700">
              <Calendar class="w-5 h-5 text-gray-500" />
              <span>{$_('audit.date')}: {formatDate(auditData.created_at)}</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-700">
              <AlertTriangle class="w-5 h-5 text-gray-500" />
              <span>{$_('audit.criticalIssues')}: {auditData.data.critical_issues || 0}</span>
            </div>
          </div>
        </div>

        {#if auditData.data.duration_seconds}
          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-blue-700">
              {$_('audit.duration')}: {Math.floor(auditData.data.duration_seconds / 60)} {$_('common.min')} {auditData.data.duration_seconds % 60} {$_('common.sec')}
            </p>
          </div>
        {/if}
      </div>

      <!-- Questions and Answers -->
      <div class="space-y-4">
        <h2 class="text-xl font-medium text-gray-900">{$_('audit.questionsAndResponses')}</h2>
        
        {#if auditData.data.answers && auditData.data.answers.length > 0}
          <div class="space-y-4">
            {#each auditData.data.answers as answer}
              <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-6 border-b border-gray-100">
                  <div class="flex items-start justify-between">
                    <h3 class="text-lg font-medium text-gray-900">
                      {answer.questionId}. {questionMap[answer.questionId] || answer.question || $_('audit.questionNotFound')}
                    </h3>
                    <div class="flex items-center space-x-2">
                      <Star class={`w-5 h-5 ${getScoreColor(answer.rating)}`} />
                      <span class={`text-xl font-light ${getScoreColor(answer.rating)}`}>
                        {answer.rating}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    class="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    on:click={() => toggleQuestionExpand(answer.questionId)}
                  >
                    <span>
                      {expandedQuestions[answer.questionId] ? $_('button.hideDetails') : $_('button.showDetails')}
                    </span>
                    <svelte:component 
                      this={expandedQuestions[answer.questionId] ? ChevronUp : ChevronDown} 
                      class="w-4 h-4" 
                    />
                  </button>
                </div>
                
                {#if expandedQuestions[answer.questionId]}
                  <div transition:slide={{ duration: 200 }} class="p-6 space-y-6 bg-gray-50">
                    <!-- Photos -->
                    {#if answer.photos && answer.photos.length > 0}
                      <div class="space-y-2">
                        <h4 class="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <Image class="w-4 h-4" />
                          <span>{$_('audit.evidencePhotos')}</span>
                        </h4>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {#each answer.photos as photo}
                            <a 
                              href={photo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              class="aspect-square rounded-lg overflow-hidden bg-gray-100 relative hover:opacity-90 transition-opacity"
                            >
                              <img
                                src={photo}
                                alt={$_('audit.evidencePhoto')}
                                class="w-full h-full object-cover"
                              />
                            </a>
                          {/each}
                        </div>
                      </div>
                    {/if}

                    <!-- Notes -->
                    {#if answer.notes}
                      <div class="space-y-2">
                        <h4 class="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <MessageSquare class="w-4 h-4" />
                          <span>{$_('audit.notes')}</span>
                        </h4>
                        <p class="text-gray-700 bg-white p-4 rounded-lg">
                          {answer.notes}
                        </p>
                      </div>
                    {/if}

                    <!-- AI Insights -->
                    {#if answer.aiInsight}
                      <div class="space-y-4 bg-purple-50 p-4 rounded-lg">
                        <h4 class="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <Brain class="w-4 h-4 text-purple-600" />
                          <span>{$_('audit.aiAnalysis')}</span>
                        </h4>
                        
                        <div class="space-y-3">
                          <div>
                            <h5 class="text-sm font-medium text-gray-700">{$_('audit.observation')}</h5>
                            <p class="text-gray-700">{answer.aiInsight.observation}</p>
                          </div>
                          
                          <div>
                            <h5 class="text-sm font-medium text-gray-700">{$_('audit.analysis')}</h5>
                            <p class="text-gray-700">{answer.aiInsight.analysis}</p>
                          </div>
                          
                          {#if answer.aiInsight.recommendations && answer.aiInsight.recommendations.length > 0}
                            <div>
                              <h5 class="text-sm font-medium text-gray-700">{$_('audit.recommendations')}</h5>
                              <ul class="space-y-2 mt-2">
                                {#each answer.aiInsight.recommendations as rec}
                                  <li class="bg-white p-3 rounded-lg">
                                    <p class="text-gray-700">{rec.text}</p>
                                    <div class="flex items-center space-x-3 mt-2 text-sm">
                                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                        {rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'}">
                                        {rec.priority}
                                      </span>
                                      <span class="text-gray-500">{$_('audit.impact')}: {rec.impact}</span>
                                    </div>
                                  </li>
                                {/each}
                              </ul>
                            </div>
                          {/if}
                          
                          {#if answer.aiInsight.followUp && answer.aiInsight.followUp.length > 0}
                            <div>
                              <h5 class="text-sm font-medium text-gray-700">{$_('audit.followUpQuestions')}</h5>
                              <ul class="list-disc list-inside mt-2">
                                {#each answer.aiInsight.followUp as question}
                                  <li class="text-gray-700">{question}</li>
                                {/each}
                              </ul>
                            </div>
                          {/if}
                        </div>
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <p class="text-gray-500">{$_('audit.noQuestionsFound')}</p>
          </div>
        {/if}
      </div>
      
      <!-- Actions -->
      <div class="flex justify-center pt-4">
        <button
          class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          on:click={() => goto('/history')}
        >
          {$_('button.backToHistory')}
        </button>
      </div>
    {/if}
  </div>
</div>