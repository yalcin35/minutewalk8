<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide, fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';
  import { Shield, BadgeCheck, DollarSign, Truck, Users, Leaf, Plus, ChevronDown, ChevronUp, Brain, TriangleAlert as AlertTriangle, Calendar, Clock, Save, Loader } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation'; 
  import { user } from '$lib/supabase';
  import Sidebar from '$lib/components/Sidebar.svelte';

  // Store subscription at the top level
  let localUser = user;

  // Sidebar state
  let isSidebarOpen = true;

  // SQCDPE+ Categories
  const categories = [
    { id: 'safety', label: 'Safety', icon: Shield, color: 'red' },
    { id: 'quality', label: 'Quality', icon: BadgeCheck, color: 'blue' },
    { id: 'cost', label: 'Cost', icon: DollarSign, color: 'yellow' },
    { id: 'delivery', label: 'Delivery', icon: Truck, color: 'green' },
    { id: 'people', label: 'People', icon: Users, color: 'purple' },
    { id: 'environment', label: 'Environment', icon: Leaf, color: 'emerald' },
    { id: 'plus', label: 'Plus (+)', icon: Plus, color: 'gray' }
  ];

  // Form state
  let selectedSite = '';
  let selectedDepartment = '';
  let shiftType = 'morning';
  let sites: Array<{ id: string; name: string }> = [];
  let departments: Array<{ id: string; name: string; site_id: string }> = [];
  let categoryStatus: Record<string, 'green' | 'yellow' | 'red'> = {};
  let categoryNotes: Record<string, string> = {};
  let generalNotes = '';
  let showActionForm = false;
  let currentCategory = '';

  // Action item form
  let actionDescription = '';
  let actionRootCause = '';
  let actionCorrectiveAction = '';
  let actionAssignedTo = '';
  let actionDueDate = '';
  let actionPriority = 'medium';

  // Loading states
  let loading = true;
  let saving = false;
  let error: string | null = null;
  let aiLoading = false;
  let aiInsight: any = null;

  // Filter departments based on selected site
  $: filteredDepartments = departments.filter(
    dept => !selectedSite || dept.site_id === selectedSite
  );

  onMount(async () => {
    try {
      // Check if user is authenticated using local variable
      if (!$localUser) {
        goto('/signin');
        return;
      }
      
      // Get user's company
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Fetch sites and departments
      const [{ data: sitesData }, { data: deptsData }] = await Promise.all([
        supabase
          .from('sites')
          .select('*')
          .eq('company_id', profile.company_id),
        supabase
          .from('departments')
          .select('*')
          .eq('company_id', profile.company_id)
      ]);

      if (sitesData) sites = sitesData;
      if (deptsData) departments = deptsData;

      // Initialize category status
      categories.forEach(cat => {
        categoryStatus[cat.id] = 'green';
        categoryNotes[cat.id] = '';
      });

    } catch (e) {
      console.error('Error loading data:', e);
      error = e instanceof Error ? e.message : 'Failed to load data';
    } finally {
      loading = false;
    }
  });

  async function handleStatusChange(category: string, status: 'green' | 'yellow' | 'red') {
    categoryStatus[category] = status;

    // Show action form for yellow/red status
    if (status !== 'green') {
      currentCategory = category;
      showActionForm = true;
    }
  }

  async function requestAIInsights() {
    if (aiLoading) return;
    
    aiLoading = true;
    try {
      const response = await fetch('/checkin/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categories: Object.entries(categoryStatus).map(([id, status]) => ({
            id,
            status,
            notes: categoryNotes[id]
          })),
          generalNotes
        })
      });

      if (!response.ok) throw new Error('Failed to get AI insights');
      aiInsight = await response.json();
    } catch (e) {
      console.error('Error getting AI insights:', e);
    } finally {
      aiLoading = false;
    }
  }

  async function handleSubmit() {
    if (!selectedSite || !selectedDepartment) {
      error = 'Please select site and department';
      return;
    }

    saving = true;
    error = null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Create checkin
      const { data: checkin, error: checkinError } = await supabase
        .from('daily_checkins')
        .insert({
          company_id: profile.company_id,
          site_id: selectedSite,
          department_id: selectedDepartment,
          created_by: user.id,
          shift_type: shiftType,
          notes: generalNotes
        })
        .select()
        .single();

      if (checkinError) throw checkinError;

      // Create category statuses
      const categoryPromises = Object.entries(categoryStatus).map(([category, status]) => 
        supabase
          .from('checkin_categories')
          .insert({
            checkin_id: checkin.id,
            category,
            status,
            notes: categoryNotes[category]
          })
      );

      await Promise.all(categoryPromises);

      // Redirect to dashboard
      goto('/dashboard');
    } catch (e) {
      console.error('Error saving checkin:', e);
      error = e instanceof Error ? e.message : 'Failed to save checkin';
    } finally {
      saving = false;
    }
  }
</script>

<div class="flex">
  <!-- Sidebar component -->
  <Sidebar bind:isOpen={isSidebarOpen} />
  
  <!-- Main content with padding to accommodate sidebar -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6 flex-grow"
       class:pl-64={isSidebarOpen}
       class:pl-20={!isSidebarOpen}
       style="transition: padding-left 0.3s">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-light text-gray-900">{$_('checkin.dailyCheckin')}</h1>
          <p class="text-gray-500">{$_('checkin.preShiftMeeting')}</p>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-500">
            <Calendar class="w-4 h-4 inline-block mr-1" />
            {new Date().toLocaleDateString()}
          </div>
          <div class="text-sm text-gray-500">
            <Clock class="w-4 h-4 inline-block mr-1" />
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {#if loading}
        <div class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      {:else}
        <div class="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <!-- Location Selection -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{$_('checkin.site')}</label>
              <select
                bind:value={selectedSite}
                class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a site</option>
                {#each sites as site}
                  <option value={site.id}>{site.name}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{$_('checkin.department')}</label>
              <select
                bind:value={selectedDepartment}
                disabled={!selectedSite}
                class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a department</option>
                {#each filteredDepartments as department}
                  <option value={department.id}>{department.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Shift Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{$_('checkin.shift')}</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  bind:group={shiftType}
                  value="morning"
                  class="form-radio text-blue-500"
                />
                <span class="ml-2">{$_('checkin.morning')}</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  bind:group={shiftType}
                  value="afternoon"
                  class="form-radio text-blue-500"
                />
                <span class="ml-2">{$_('checkin.afternoon')}</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  bind:group={shiftType}
                  value="night"
                  class="form-radio text-blue-500"
                />
                <span class="ml-2">{$_('checkin.night')}</span>
              </label>
            </div>
          </div>

          <!-- Category Status -->
          <div class="space-y-4">
            <h2 class="text-lg font-medium text-gray-900">{$_('checkin.categoryStatus')}</h2>
            
            {#each categories as category}
              <div class="bg-gray-50 rounded-lg p-4 space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-lg bg-{category.color}-100">
                      <svelte:component 
                        this={category.icon}
                        class="w-5 h-5 text-{category.color}-600"
                      />
                    </div>
                    <span class="font-medium">{$_(`sqcdpe.${category.id}`)}</span>
                  </div>

                  <div class="flex items-center space-x-2">
                    <button
                      class="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 
                             transition-colors {categoryStatus[category.id] === 'green' ? 'ring-2 ring-green-500' : ''}"
                      on:click={() => handleStatusChange(category.id, 'green')}
                    >
                      <span class="sr-only">{$_('sqcdpe.green')}</span>
                    </button>
                    <button
                      class="w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 
                             transition-colors {categoryStatus[category.id] === 'yellow' ? 'ring-2 ring-yellow-500' : ''}"
                      on:click={() => handleStatusChange(category.id, 'yellow')}
                    >
                      <span class="sr-only">{$_('sqcdpe.yellow')}</span>
                    </button>
                    <button
                      class="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 
                             transition-colors {categoryStatus[category.id] === 'red' ? 'ring-2 ring-red-500' : ''}"
                      on:click={() => handleStatusChange(category.id, 'red')}
                    >
                      <span class="sr-only">{$_('sqcdpe.red')}</span>
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <textarea
                    bind:value={categoryNotes[category.id]}
                    class="w-full px-4 py-2 rounded-lg bg-white border-gray-200
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           resize-none"
                    rows="2"
                    placeholder={`${$_('checkin.addGeneralNotes')} ${$_(`sqcdpe.${category.id}`)}...`}
                  ></textarea>
                </div>
              </div>
            {/each}
          </div>

          <!-- General Notes -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{$_('checkin.generalNotes')}</label>
            <textarea
              bind:value={generalNotes}
              class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     resize-none"
              rows="4"
              placeholder={$_('checkin.addGeneralNotes')}
            ></textarea>
          </div>

          <!-- AI Insights -->
          <div class="space-y-4">
            <button
              class="flex items-center space-x-2 px-4 py-2 bg-purple-100 
                     text-purple-600 rounded-lg hover:bg-purple-200 
                     transition-colors disabled:opacity-50"
              on:click={requestAIInsights}
              disabled={aiLoading}
            >
              <Brain class="w-5 h-5" />
              <span>{aiLoading ? $_('checkin.analyzing') : $_('checkin.getAIInsights')}</span>
            </button>

            {#if aiInsight}
              <div class="bg-purple-50 rounded-lg p-4 space-y-4">
                <h3 class="font-medium text-purple-900">{$_('checkin.aiAnalysis')}</h3>
                <div class="prose prose-sm text-purple-800">
                  <p>{aiInsight.summary}</p>
                  {#if aiInsight.recommendations?.length}
                    <h4 class="text-sm font-medium mt-4">Recommendations:</h4>
                    <ul class="list-disc pl-4 space-y-2">
                      {#each aiInsight.recommendations as rec}
                        <li>{rec}</li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              </div>
            {/if}
          </div>

          <!-- Error Message -->
          {#if error}
            <div 
              class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"
              transition:fly={{ y: 10, duration: 300 }}
            >
              <AlertTriangle class="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          {/if}

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <button
              class="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white 
                     rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
              on:click={handleSubmit}
              disabled={saving}
            >
              {#if saving}
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{$_('common.saving')}</span>
              {:else}
                <Save class="w-5 h-5" />
                <span>{$_('checkin.submitCheckin')}</span>
              {/if}
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>