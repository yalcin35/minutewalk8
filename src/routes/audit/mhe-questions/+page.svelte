<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { ChevronRight, ChevronLeft, Save, Brain, RefreshCw, Circle as XCircle, ArrowLeft, Clock, Truck } from 'lucide-svelte';
  import { mheQuestions } from '$lib/data/mhe-questions';
  import PhotoUpload from '$lib/components/PhotoUpload.svelte';
  import PhotoDisplay from '$lib/components/PhotoDisplay.svelte';
  import AIInsights from '$lib/components/AIInsights.svelte';
  import QuestionHistory from '$lib/components/QuestionHistory.svelte';
  import AuditTimer from '$lib/components/AuditTimer.svelte';
  import { getAIInsights } from '$lib/services/ai';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import type { AIInsight } from '$lib/types/ai';
  import { browser } from '$app/environment';
  import { _ } from 'svelte-i18n';
  import { locale } from '$lib/i18n';
  
  // Constants for scoring calculation
  const MAX_POINTS_PER_QUESTION = 5;
  const QUESTIONS_PER_CATEGORY = 5;
  const TOTAL_QUESTIONS = 25;

  interface Photo {
    id: string;
    file: File;
    thumbnail: string;
  }

  interface Answer {
    rating: number;
    photos: Photo[];
    notes: string;
    aiInsight?: AIInsight | null;
  }

  interface PreviousAnswer {
    rating: number;
    photos: string[];
    notes: string;
    created_at: string;
    aiInsight?: AIInsight;
    user: {
      full_name: string;
      email: string;
    };
  }

  let currentQuestionIndex = 0;
  let progress = spring(0);
  let answers: Record<number, Answer> = {};
  let previousAnswers: Record<number, PreviousAnswer[]> = {};
  let aiLoading = false;
  let aiError: string | null = null;
  let saving = false;
  let saveError: string | null = null;
  let showExitModal = false;
  let auditSetupId: string | null = null;
  let currentSetup: {
    site_id: string;
    department_id: string;
    audit_type: string;
    start_time?: string;
  } | null = null;
  let loadingPrevious = true;
  let loadError: string | null = null;
  let timerRef = { stopTimer: () => 0 };
  let elapsedSeconds = 0;
  let currentLocale: string;
  
  $: currentQuestion = mheQuestions[currentQuestionIndex];
  $: currentAnswer = answers[currentQuestion.id] || { rating: 0, photos: [], notes: '', aiInsight: null };
  $: progress.set((currentQuestionIndex / (mheQuestions.length - 1)) * 100);

  // Subscribe to locale changes
  locale.subscribe(value => {
    currentLocale = value;
  });

  onMount(async () => {
    try {
      // Get the latest audit setup
      const { data: setupData, error: setupError } = await supabase
        .from('audit_setups')
        .select(`
          id,
          site_id,
          department_id,
          audit_type,
          start_time
        `)
        .eq('audit_type', 'mhe')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (setupError) throw setupError;
      if (!setupData) {
        goto('/audit/setup');
        return;
      }

      auditSetupId = setupData.id;
      currentSetup = {
        site_id: setupData.site_id,
        department_id: setupData.department_id,
        audit_type: setupData.audit_type,
        start_time: setupData.start_time
      };

      // Load previous audit data
      await loadPreviousAudits();

      if (browser) {
        window.addEventListener('popstate', handlePopState);
        
        // Save initial state
        const state = {
          questionIndex: currentQuestionIndex,
          answers
        };
        history.replaceState(state, '', window.location.href);
      }
    } catch (e) {
      console.error('Error loading audit setup:', e);
      loadError = e instanceof Error ? e.message : 'Failed to load data';
    } finally {
      loadingPrevious = false;
    }

    return () => {
      if (browser) {
        window.removeEventListener('popstate', handlePopState);
      }
    };
  });

  async function loadPreviousAudits() {
    if (!currentSetup) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's company
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Fetch previous audits with matching site, department, and type
      const { data: audits, error: fetchError } = await supabase
        .from('audit_history')
        .select('*')
        .eq('site_id', currentSetup.site_id)
        .eq('department_id', currentSetup.department_id)
        .eq('audit_type', currentSetup.audit_type)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Process audit data
      previousAnswers = {};
      audits?.forEach(audit => {
        const answers = audit.data.answers || [];
        answers.forEach(answer => {
          if (!previousAnswers[answer.questionId]) {
            previousAnswers[answer.questionId] = [];
          }
          previousAnswers[answer.questionId].push({
            rating: answer.rating,
            photos: answer.photos || [],
            notes: answer.notes,
            aiInsight: answer.aiInsight,
            created_at: audit.created_at,
            user: {
              full_name: audit.full_name || audit.email.split('@')[0],
              email: audit.email
            }
          });
        });
      });
    } catch (e) {
      console.error('Error loading previous audits:', e);
      throw e;
    }
  }

  function handlePopState(event: PopStateEvent) {
    if (event.state) {
      currentQuestionIndex = event.state.questionIndex;
      answers = event.state.answers;
    }
  }

  function updateHistory() {
    if (browser) {
      const state = {
        questionIndex: currentQuestionIndex,
        answers
      };
      history.pushState(state, '', window.location.href);
    }
  }

  function handleTimerTick(seconds: number) {
    elapsedSeconds = seconds;
  }

  async function requestAIInsights() {
    if (currentAnswer.rating === 0 || !currentAnswer.notes) {
      aiError = 'Please provide a rating and notes before requesting AI insights';
      return;
    }

    aiLoading = true;
    aiError = null;

    try {
      const insight = await getAIInsights(
        currentQuestion.text,
        currentAnswer.rating,
        currentAnswer.notes,
        currentAnswer.photos.map(p => p.file),
        'mhe' // Pass 'mhe' as the audit type to use the MHE-specific endpoint
      );

      answers[currentQuestion.id] = { ...currentAnswer, aiInsight: insight };
      updateHistory();
    } catch (error) {
      aiError = 'Failed to get AI insights. Please try again.';
    } finally {
      aiLoading = false;
    }
  }

  function handleRating(value: number) {
    answers[currentQuestion.id] = { ...currentAnswer, rating: value };
    if ('vibrate' in navigator) navigator.vibrate(15);
    updateHistory();
  }

  function handlePhotos(event: CustomEvent<{ photos: Photo[] }>) {
    answers[currentQuestion.id] = { ...currentAnswer, photos: event.detail.photos };
    updateHistory();
  }

  function handlePhotoError(event: CustomEvent<{ message: string }>) {
    console.error(event.detail.message);
  }

  function handleNotes(event: Event) {
    const notes = (event.target as HTMLTextAreaElement).value;
    answers[currentQuestion.id] = { ...currentAnswer, notes };
    updateHistory();
  }

  function removePhoto(id: string) {
    const updatedPhotos = currentAnswer.photos.filter(p => p.id !== id);
    answers[currentQuestion.id] = { ...currentAnswer, photos: updatedPhotos };
    updateHistory();
  }

  function navigate(direction: 'prev' | 'next') {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      currentQuestionIndex--;
    } else if (direction === 'next' && currentQuestionIndex < mheQuestions.length - 1) {
      currentQuestionIndex++;
    }
    if ('vibrate' in navigator) navigator.vibrate(15);
    updateHistory();
  }

  async function uploadPhotos(photos: Photo[], questionId: number): Promise<string[]> {
    const uploadPromises = photos.map(async (photo) => {
      const fileExt = photo.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `audit-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, photo.file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  }

  async function saveAudit() {
    saving = true;
    saveError = null;

    try {
      // Get user and company info
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Stop the timer and get the final duration
      const duration = timerRef.stopTimer();
      
      // Upload photos and prepare audit data
      const auditData = await Promise.all(
        Object.entries(answers).map(async ([questionId, answer]) => {
          const photoUrls = await uploadPhotos(answer.photos, parseInt(questionId));
          
          return {
            questionId: parseInt(questionId),
            rating: answer.rating,
            notes: answer.notes,
            photos: photoUrls,
            aiInsight: answer.aiInsight
          };
        })
      );

      // Calculate average score
      const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.rating, 0);
      const avgScore = totalScore / Object.keys(answers).length || 0;
      
      // Calculate percentage score (total points / max possible points * 100)
      const totalQuestions = Object.keys(answers).length;
      const maxPossiblePoints = totalQuestions * MAX_POINTS_PER_QUESTION;
      const percentageScore = (totalScore / maxPossiblePoints) * 100;
      
      // Count critical issues (ratings of 1 or 2)
      const criticalIssues = Object.values(answers).filter(answer => answer.rating <= 2).length;

      // Save audit to database with duration, raw score and percentage score
      const { error: saveError } = await supabase
        .from('audits')
        .insert({
          user_id: user.id,
          company_id: profile.company_id,
          setup_id: auditSetupId,
          data: {
            version: 1,
            timestamp: new Date().toISOString(),
            answers: auditData,
            score: percentageScore,
            critical_issues: criticalIssues,
            duration_seconds: duration
          }
        });

      if (saveError) throw saveError;

      // Redirect to dashboard on success
      goto('/dashboard');
    } catch (error) {
      console.error('Failed to save audit:', error);
      saveError = error instanceof Error ? error.message : 'Failed to save audit';
      saving = false;
    }
  }

  function handleExit() {
    showExitModal = true;
  }

  function confirmExit() {
    showExitModal = false;
    goto('/dashboard');
  }

  function cancelExit() {
    showExitModal = false;
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-white">
  <!-- Progress Bar -->
  <div class="fixed top-0 left-0 w-full h-1 bg-gray-100">
    <div 
      class="h-full bg-orange-500 transition-all duration-300 ease-out"
      style="width: {$progress}%"
    />
  </div>

  <!-- Exit Button -->
  <button
    class="fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 bg-red-50 
           text-red-600 rounded-lg hover:bg-red-100 transition-colors z-50"
    on:click={handleExit}
  >
    <XCircle class="w-5 h-5" />
    <span>Exit</span>
  </button>

  <!-- Category Header -->
  <div class="bg-white shadow-sm">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center">
      <!-- Left Section (Question Info) -->
      <div class="flex-1">
        <h1 class="text-sm font-medium text-orange-600">
          {currentQuestion.category}
        </h1>
        <p class="text-gray-500 text-sm mt-1">
          Question {currentQuestionIndex + 1} of {mheQuestions.length}
        </p>
      </div>

      <!-- Centered Timer -->
      <div class="flex-1 flex justify-center">
        <div class="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-lg">
          <AuditTimer 
            startTime={currentSetup?.start_time ? new Date(currentSetup.start_time) : null}
            onTick={handleTimerTick}
            bind:this={timerRef}
          />
        </div>
      </div>

      <!-- Right Spacer -->
      <div class="flex-1"><!-- Empty spacer for balance --></div>
    </div>
  </div>
  
  <!-- Main Content Area -->
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <div 
      in:fly={{ y: 20, duration: 300 }}
      out:fly={{ y: -20, duration: 300 }}
      class="space-y-8"
    >
      <!-- Question -->
      <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div class="flex items-start space-x-4">
          <div class="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1">
            <Truck class="w-5 h-5 text-orange-600" />
          </div>
          <h2 class="text-xl font-light text-gray-900">
            {currentLocale === 'de' && currentQuestion.text_de ? currentQuestion.text_de : currentLocale === 'tr' && currentQuestion.text_tr ? currentQuestion.text_tr : currentQuestion.text}
          </h2>
        </div>

        <!-- Question History -->
        {#if !loadingPrevious && previousAnswers[currentQuestion.id]?.length > 0}
          <QuestionHistory
            questionId={currentQuestion.id}
            previousAnswers={previousAnswers[currentQuestion.id]}
          />
        {/if}
        
        
        <!-- Rating -->
        <div class="flex justify-between items-center py-4">
          {#each Array(5) as _, i}
            <button
              class="w-14 h-14 rounded-xl transition-all duration-200
                     hover:bg-orange-50 focus:outline-none focus:ring-2
                     focus:ring-orange-500 focus:ring-offset-2 relative
                     {currentAnswer.rating === i + 1 ? 'bg-orange-500 text-white shadow-lg' : 'bg-white shadow-md'}"
              on:click={() => handleRating(i + 1)}
            >
              <span class="text-lg font-medium">
                {i + 1}
              </span>
              {#if currentAnswer.rating === i + 1}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full" />
              {/if}
              
            </button>
          {/each}
          
        </div>

        <!-- Photo Upload and Display -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Evidence Photos</label>
          <PhotoUpload
            photos={currentAnswer.photos}
            on:change={handlePhotos}
            on:error={handlePhotoError}
          />
          <PhotoDisplay
            photos={currentAnswer.photos}
            onRemove={removePhoto}
          />
        </div>

        <!-- Notes -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{$_('walks.notes')}</label>
          <textarea
            value={currentAnswer.notes}
            on:input={handleNotes}
            class="w-full p-4 h-24 rounded-xl bg-gray-50
                   border-none text-gray-700 placeholder-gray-400
                   focus:ring-2 focus:ring-orange-500 focus:outline-none
                   resize-none"
            placeholder={$_('walks.addNotes')}
          />
        </div>

        <!-- AI Review Button -->
        <div class="flex space-x-4">
          {#if !currentAnswer.aiInsight}
            <button
              class="flex items-center space-x-2 px-4 py-2 bg-purple-50 
                     text-purple-600 rounded-lg hover:bg-purple-100 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"
              on:click={requestAIInsights}
              disabled={aiLoading || !currentAnswer.rating || !currentAnswer.notes}
            >
              <Brain class="w-5 h-5" />
              <span>Get AI Review</span>
            </button>
          {:else}
            <button
              class="flex items-center space-x-2 px-4 py-2 bg-purple-50 
                     text-purple-600 rounded-lg hover:bg-purple-100 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"
              on:click={requestAIInsights}
              disabled={aiLoading}
            >
              <RefreshCw class="w-5 h-5 {aiLoading ? 'animate-spin' : ''}" />
              <span>Refresh AI Review</span>
            </button>
          {/if}
          
        </div>
      </div>

      <!-- AI Insights -->
      {#if currentAnswer.rating > 0 && currentAnswer.notes && (aiLoading || currentAnswer.aiInsight || aiError)}
        <AIInsights
          insight={currentAnswer.aiInsight}
          loading={aiLoading}
          error={aiError}
        />
      {/if}
      

      <!-- Save Error Message -->
      {#if saveError}
        <div 
          class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"
          transition:fly={{ y: 10, duration: 300 }}
        >
          <span>{saveError}</span>
        </div>
      {/if}
      
    </div>
  </div>

  <!-- Navigation Buttons -->
  <div class="fixed bottom-8 right-8 flex space-x-4">
    {#if currentQuestionIndex > 0}
      <button
        class="w-12 h-12 rounded-xl bg-white text-orange-500 shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-orange-500
               focus:ring-offset-2"
        on:click={() => navigate('prev')}
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
    {/if}
    

    {#if currentQuestionIndex === mheQuestions.length - 1}
      <button
        class="px-6 h-12 rounded-xl bg-green-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-green-500
               focus:ring-offset-2 space-x-2 disabled:opacity-50
               disabled:cursor-not-allowed disabled:hover:scale-100"
        on:click={saveAudit}
        disabled={saving}
      >
        {#if saving}
          <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Saving...</span>
        {:else}
          <Save class="w-5 h-5" />
          <span>Save Audit</span>
        {/if}
        
      </button>
    {:else}
      <button
        class="w-12 h-12 rounded-xl bg-orange-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-orange-500
               focus:ring-offset-2"
        on:click={() => navigate('next')}
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    {/if}
    
  </div>

  <!-- Exit Confirmation Modal -->
  {#if showExitModal}
    <div 
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]"
      transition:fade={{ duration: 200 }}
      on:click={cancelExit}
    >
      <div 
        class="bg-white rounded-xl p-6 max-w-md w-full space-y-4"
        on:click|stopPropagation
      >
        <h3 class="text-lg font-medium text-gray-900">
          Are you sure you want to exit the audit?
        </h3>
        
        <p class="text-red-600 font-medium">
          WARNING: Any unsaved progress will be lost and cannot be recovered.
        </p>
        
        <div class="flex justify-end space-x-4">
          <button
            class="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            on:click={cancelExit}
          >
            Cancel
          </button>
          
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                   transition-colors"
            on:click={confirmExit}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  {/if}
  
</div>