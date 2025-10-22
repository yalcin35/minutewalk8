<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { _, locale } from 'svelte-i18n';
  import { setLocale } from '$lib/i18n';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { clearSupabaseAuth } from '$lib/supabase';
  import { Settings as SettingsIcon, User, Building2, Save, CircleAlert as AlertCircle, Lock, Upload, ArrowLeft, Globe, Check, LogOut } from 'lucide-svelte';

  let loading = false;
  let saving = false;
  let error: string | null = null;
  let success = false;
  let currentLocale: string;

  // Form data
  let fullName = '';
  let username = '';
  let email = '';
  let companyName = '';
  let companyLogo: string | null = null;
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let logoFile: File | null = null;

  // Subscribe to locale changes
  locale.subscribe(value => {
    currentLocale = value;
  });

  function changeLanguage(lang: string) {
    setLocale(lang);
  }

  onMount(async () => {
    loading = true;
    try {
      // Get user profile and company data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          full_name,
          username,
          email,
          companies (
            name,
            logo_url
          )
        `)
        .eq('id', $user?.id)
        .single();
      if (profileError) throw profileError;
      if (profile) {
        fullName = profile.full_name || '';
        username = profile.username || '';
        email = profile.email;
        companyName = profile.companies?.name || '';
        companyLogo = profile.companies?.logo_url || null;
      }
    } catch (e) {
      console.error('Error loading profile:', e);
      error = 'Failed to load profile data';
    } finally {
      loading = false;
    }
  });

  async function uploadLogo(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;
    const { error: uploadError, data } = await supabase.storage
      .from('public')
      .upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);
    return publicUrl;
  }

  async function handleLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      error = 'Please upload an image file';
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      error = 'File size must be less than 5MB';
      return;
    }
    logoFile = file;
  }

  async function handleSave() {
    saving = true;
    error = null;
    success = false;
    try {
      // Validate password change if attempted
      if (newPassword || confirmPassword || currentPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('New passwords do not match');
        }
        if (!currentPassword) {
          throw new Error('Current password is required to change password');
        }
        if (newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters long');
        }
        // Update password
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (passwordError) throw passwordError;
      }

      // Upload new logo if provided
      let logoUrl;
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username,
          updated_at: new Date().toISOString()
        })
        .eq('id', $user?.id);
      if (profileError) throw profileError;

      // Update company logo if provided
      if (logoUrl) {
        const { error: companyError } = await supabase
          .from('companies')
          .update({
            logo_url: logoUrl
          })
          .eq('id', (await supabase
            .from('profiles')
            .select('company_id')
            .eq('id', $user?.id)
            .single()
          ).data?.company_id);
        if (companyError) throw companyError;
        // Update local state
        companyLogo = logoUrl;
      }

      // Clear sensitive fields
      currentPassword = '';
      newPassword = '';
      confirmPassword = '';
      logoFile = null;
      success = true;
    } catch (e) {
      console.error('Error updating profile:', e);
      error = e instanceof Error ? e.message : 'Failed to update profile';
    } finally {
      saving = false;
    }
  }

  // Logout handler
  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      clearSupabaseAuth();
      goto('/signin');
    } catch (err) {
      console.error('Logout failed:', err);
      error = 'Failed to log out. Please try again.';
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
  <div class="max-w-2xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <SettingsIcon class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 class="text-2xl font-light text-gray-900">Settings</h1>
          <p class="text-gray-500">Manage your account preferences</p>
        </div>
      </div>
      <!-- Back to Dashboard Button -->
      <button
        class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg
               hover:bg-blue-600 transition-colors"
        on:click={() => goto('/dashboard')}
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
        <!-- Personal Information -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 text-gray-700">
            <User class="w-5 h-5" />
            <h2 class="text-lg font-medium">{$_('settings.personalInformation')}</h2>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="fullName">
                {$_('settings.fullName')}
              </label>
              <input
                id="fullName"
                type="text"
                bind:value={fullName}
                class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="username">
                {$_('settings.username')}
              </label>
              <input
                id="username"
                type="text"
                bind:value={username}
                class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
                {$_('settings.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                class="w-full px-4 py-2 rounded-xl bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <!-- Password Change -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 text-gray-700">
            <Lock class="w-5 h-5" />
            <h2 class="text-lg font-medium">{$_('settings.changePassword')}</h2>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="currentPassword">
                {$_('settings.currentPassword')}
              </label>
              <input
                id="currentPassword"
                type="password"
                bind:value={currentPassword}
                class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="newPassword">
                {$_('settings.newPassword')}
              </label>
              <input
                id="newPassword"
                type="password"
                bind:value={newPassword}
                class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="confirmPassword">
                {$_('settings.confirmNewPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                bind:value={confirmPassword}
                class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>

        <!-- Language Settings -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 text-gray-700">
            <Globe class="w-5 h-5" />
            <h2 class="text-lg font-medium">{$_('settings.language')}</h2>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-4">{$_('settings.selectLanguage')}</label>
              <div class="space-y-3">
                <div 
                  class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  on:click={() => changeLanguage('en')}
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-blue-600 font-medium">EN</span>
                    </div>
                    <span class="font-medium">{$_('settings.english')}</span>
                  </div>
                  {#if currentLocale === 'en'}<Check class="w-5 h-5 text-blue-500" />{/if}
                </div>
                <div 
                  class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  on:click={() => changeLanguage('de')}
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-blue-600 font-medium">DE</span>
                    </div>
                    <span class="font-medium">{$_('settings.german')}</span>
                  </div>
                  {#if currentLocale === 'de'}<Check class="w-5 h-5 text-blue-500" />{/if}
                </div>
                <div 
                  class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  on:click={() => changeLanguage('tr')}
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-blue-600 font-medium">TR</span>
                    </div>
                    <span class="font-medium">{$_('settings.turkish')}</span>
                  </div>
                  {#if currentLocale === 'tr'}<Check class="w-5 h-5 text-blue-500" />{/if}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Information -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 text-gray-700">
            <Building2 class="w-5 h-5" />
            <h2 class="text-lg font-medium">{$_('settings.companyInformation')}</h2>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="company">
                {$_('settings.companyName')}
              </label>
              <input
                id="company"
                type="text"
                value={companyName}
                disabled
                class="w-full px-4 py-2 rounded-xl bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>
            <!-- Company Logo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {$_('settings.companyLogo')}
              </label>
              <div class="flex items-start space-x-4">
                <!-- Logo Preview -->
                <div class="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  {#if companyLogo}
                    <img
                      src={companyLogo}
                      alt="Company logo"
                      class="w-full h-full object-cover"
                    />
                  {:else}
                    <Building2 class="w-8 h-8 text-gray-400" />
                  {/if}
                </div>
                <!-- Upload Button -->
                <div class="flex-1">
                  <label
                    class="flex items-center justify-center w-full h-24 px-4 transition
                           bg-white border-2 border-gray-300 border-dashed rounded-lg
                           appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"
                  >
                    <div class="flex flex-col items-center space-y-2">
                      <Upload class="w-6 h-6 text-gray-400" />
                      <span class="text-sm text-gray-500">
                        {$_('settings.uploadNewLogo')}
                      </span>
                      <span class="text-xs text-gray-400">
                        {$_('settings.imageTypes')}
                      </span>
                    </div>
                    <input
                      type="file"
                      class="hidden"
                      accept="image/*"
                      on:change={handleLogoChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages -->
        {#if error}
          <div 
            class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"
            transition:fly={{ y: 10, duration: 300 }}
          >
            <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        {/if}
        {#if success}
          <div 
            class="bg-green-50 text-green-600 p-4 rounded-lg"
            transition:fly={{ y: 10, duration: 300 }}
          >
            {$_('settings.settingsUpdated')}
          </div>
        {/if}

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            class="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white 
                   rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleSave}
            disabled={saving}
          >
            {#if saving}
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{$_('settings.saving')}</span>
            {:else}
              <Save class="w-5 h-5" />
              <span>{$_('settings.saveChanges')}</span>
            {/if}
          </button>
        </div>

        <!-- Logout Button -->
        <div class="flex justify-end mt-6">
          <button
            class="flex items-center space-x-2 px-6 py-2 text-red-600 
                   hover:bg-red-50 rounded-xl transition-colors"
            on:click={handleLogout}
          >
            <LogOut class="w-5 h-5" />
            <span>{$_('common.logout')}</span>
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>