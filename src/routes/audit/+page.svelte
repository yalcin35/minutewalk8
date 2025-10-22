<script lang="ts">
  import { fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { ChevronRight, ChevronLeft, Save, Brain, RefreshCw } from 'lucide-svelte';
  import { questions } from '$lib/data/questions';
  import PhotoUpload from '$lib/components/PhotoUpload.svelte';
  import PhotoDisplay from '$lib/components/PhotoDisplay.svelte';
  import AIInsights from '$lib/components/AIInsights.svelte';
  import { getAIInsights } from '$lib/services/ai';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import type { AIInsight } from '$lib/types/ai';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { _ } from 'svelte-i18n';

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

  let currentQuestionIndex = 0;
  let progress = spring(0);
  let answers: Record<number, Answer> = {};
  let aiLoading = false;
  let aiError: string | null = null;
  let saving = false;
  let saveError: string | null = null;
  
  $: currentQuestion = questions[currentQuestionIndex];
  $: currentAnswer = answers[currentQuestion.id] || { rating: 0, photos: [], notes: '', aiInsight: null };
  $: progress.set((currentQuestionIndex / (questions.length - 1)) * 100);

  // Handle browser history state
  onMount(() => {
    if (browser) {
      window.addEventListener('popstate', handlePopState);
      
      // Save initial state
      const state = {
        questionIndex: currentQuestionIndex,
        answers
      };
      history.replaceState(state, '', window.location.href);
    }

    return () => {
      if (browser) {
        window.removeEventListener('popstate', handlePopState);
      }
    };
  });

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
        currentAnswer.photos.map(p => p.file)
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
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
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

      // Save audit to database
      const { error: saveError } = await supabase
        .from('audits')
        .insert({
          user_id: user.id,
          company_id: profile.company_id,
          data: {
            version: 1,
            timestamp: new Date().toISOString(),
            answers: auditData
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
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
  <!-- Progress Bar -->
  <div class="fixed top-0 left-0 w-full h-1 bg-gray-100">
    <div 
      class="h-full bg-blue-500 transition-all duration-300 ease-out"
      style="width: {$progress}%"
    ></div>
  </div>

  <!-- Category Header -->
  <div class="bg-white shadow-sm">
    <div class="max-w-4xl mx-auto px-6 py-4">
      <h1 class="text-sm font-medium text-blue-600">
        {currentQuestion.category}
      </h1>
      <p class="text-gray-500 text-sm mt-1">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
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
        <h2 class="text-xl font-light text-gray-900">
          {currentQuestion.text}
        </h2>
        
        <!-- Rating -->
        <div class="flex justify-between items-center py-4">
          {#each Array(5) as _, i}
            <button
              class="w-14 h-14 rounded-xl transition-all duration-200
                     hover:bg-blue-50 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 relative
                     {currentAnswer.rating === i + 1 ? 'bg-blue-500 text-white shadow-lg' : 'bg-white shadow-md'}"
              on:click={() => handleRating(i + 1)}
            >
              <span class="text-lg font-medium">
                {i + 1}
              </span>
              {#if currentAnswer.rating === i + 1}
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
              {/if}
            </button>
          {/each}
        </div>

        <!-- Photo Upload and Display -->
        <div class="space-y-2">
          <label for="evidence-photos" class="text-sm font-medium text-gray-700">Evidence Photos</label>
          <PhotoUpload
            id="evidence-photos"
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
          <label for="observation-notes" class="text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="observation-notes"
            value={currentAnswer.notes}
            on:input={handleNotes}
            class="w-full p-4 h-24 rounded-xl bg-gray-50
                   border-none text-gray-700 placeholder-gray-400
                   focus:ring-2 focus:ring-blue-500 focus:outline-none
                   resize-none"
            placeholder="Add your observations..."
          ></textarea>
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
        class="w-12 h-12 rounded-xl bg-white text-blue-500 shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:ring-offset-2"
        on:click={() => navigate('prev')}
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
    {/if}

    {#if currentQuestionIndex === questions.length - 1}
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
          <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Saving...</span>
        {:else}
          <Save class="w-5 h-5" />
          <span>Save Audit</span>
        {/if}
      </button>
    {:else}
      <button
        class="w-12 h-12 rounded-xl bg-blue-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:ring-offset-2"
        on:click={() => navigate('next')}
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    {/if}
  </div>
</div>