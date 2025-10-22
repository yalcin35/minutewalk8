<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';
  import { Orbit, Building2, Map, Users, ClipboardCheck, ArrowRight, ArrowLeft } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { user, isLoading, clearSupabaseAuth } from '$lib/supabase';

  let loading = true;
  let error: string | null = null;
  let saving = false;

  // Form data
  let selectedSite = '';
  let selectedDepartment = '';
  let selectedAuditType = '';

  // Options
  let sites: Array<{ id: string; name: string }> = [];
  let departments: Array<{ id: string; name: string; site_id: string }> = [];
  let userLevel = 5; // Default to lowest level

  const auditTypes = [
    { value: '5s', labelKey: 'walks.5s' },
    { value: 'hse', labelKey: 'walks.hse' },
    { value: 'mhe', labelKey: 'walks.mhe' },
    { value: 'gemba', labelKey: 'walks.gemba' }
  ];

  onMount(async () => {
    // Check if user is authenticated
    if (!$user && !$isLoading) {
      clearSupabaseAuth();
      goto('/signin');
      return;
    }

    try {
      // Fetch sites for the user's company
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // Get user's level
      const { data: levelData } = await supabase
        .from('user_levels')
        .select('level')
        .eq('user_id', userData.user.id)
        .single();

      if (levelData) {
        userLevel = levelData.level;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', userData.user.id)
        .single();

      if (!profile?.company_id) throw new Error('Company not found');

      // Fetch sites
      const { data: sitesData, error: sitesError } = await supabase
        .from('sites')
        .select('*')
        .eq('company_id', profile.company_id);

      if (sitesError) throw sitesError;
      sites = sitesData;

      // Fetch departments
      const { data: departmentsData, error: departmentsError } = await supabase
        .from('departments')
        .select('*')
        .eq('company_id', profile.company_id);

      if (departmentsError) throw departmentsError;
      departments = departmentsData;

    } catch (e) {
      console.error('Error loading data:', e);
      error = e instanceof Error ? e.message : 'Failed to load data';
    } finally {
      loading = false;
    }
  });

  // Filter departments based on selected site
  $: filteredDepartments = departments.filter(
    dept => dept.site_id === selectedSite
  );

  async function handleSubmit() {
    if (!selectedSite || !selectedDepartment || !selectedAuditType) {
      error = 'Please fill in all fields';
      return;
    }

    saving = true;
    error = null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create audit setup record with start time
      const { error: setupError } = await supabase
        .from('audit_setups')
        .insert({
          user_id: user.id,
          site_id: selectedSite,
          department_id: selectedDepartment,
          audit_type: selectedAuditType,
          start_time: new Date().toISOString() // Record the start time
        });

      if (setupError) throw setupError;

      // Redirect to the appropriate audit questions page based on type
      if (selectedAuditType === 'hse') {
        goto('/audit/hse-questions');
      } else if (selectedAuditType === 'mhe') {
        goto('/audit/mhe-questions');
      } else if (selectedAuditType === 'gemba') {
        goto('/audit/gemba-questions');
      } else {
        goto('/audit/questions');
      }
    } catch (e) {
      console.error('Error saving audit setup:', e);
      error = e instanceof Error ? e.message : 'Failed to save audit setup';
    } finally {
      saving = false;
    }
  }

  function handleBack() {
    goto('/dashboard');
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
  <div class="max-w-2xl mx-auto space-y-8">
    <!-- Header with Back Button -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="brand-logo">
          <Orbit class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-2xl font-light text-gray-900">{$_('nav.newWalk')}</h1>
          <p class="text-gray-500">{$_('walks.configureWalk')}</p>
        </div>
      </div>
      <button
        on:click={handleBack}
        class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 
               bg-white/70 rounded-lg hover:bg-white/90 transition-colors
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>{$_('settings.backToDashboard')}</span>
      </button>
    </div>

    {#if loading}
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else}
      <div class="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-6 space-y-6">
        <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
          <!-- Site Selection -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Map class="w-4 h-4" />
              <span>{$_('checkin.site')}</span>
            </label>
            <select
              bind:value={selectedSite}
              class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{$_('walks.selectSite')}</option>
              {#each sites as site}
                <option value={site.id}>{site.name}</option>
              {/each}
            </select>
          </div>

          <!-- Department Selection -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building2 class="w-4 h-4" />
              <span>{$_('checkin.department')}</span>
            </label>
            <select
              bind:value={selectedDepartment}
              disabled={!selectedSite}
              class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{$_('walks.selectDepartment')}</option>
              {#each filteredDepartments as department}
                <option value={department.id}>{department.name}</option>
              {/each}
            </select>
          </div>

          <!-- Audit Type Selection -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <ClipboardCheck class="w-4 h-4" />
              <span>{$_('walks.selectWalkType')}</span> </label>
            <select
              bind:value={selectedAuditType}
              class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{$_('walks.selectWalkType')}</option>
              {#each auditTypes as type}
                <option value={type.value}>
                  {$_(type.labelKey)}
                </option>
              {/each}
            </select>
          </div>

          {#if error}
            <div 
              class="bg-red-50 text-red-600 p-4 rounded-lg"
              transition:fly={{ y: 10, duration: 300 }}
            >
              {error}
            </div>
          {/if}

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full flex items-center justify-center space-x-2 py-3 px-4
                   bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:ring-offset-2 transition-colors disabled:opacity-50 
                   disabled:cursor-not-allowed"
            disabled={saving}
          >
            {#if saving}
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Setting up...</span>
            {:else}
              <span>{$_('walks.startWalk')}</span>
              <ArrowRight class="w-5 h-5" />
            {/if}
          </button>
        </form>
      </div>
    {/if}
  </div>
</div>