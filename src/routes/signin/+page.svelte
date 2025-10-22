<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { fade, fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';
  import { Orbit, Mail, Lock, CircleAlert as AlertCircle, ArrowLeft, Loader as Loader2 } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { clearSupabaseAuth } from '$lib/supabase';

  let email = '';
  let password = '';
  let companyName = '';
  let loading = false;
  let error: string | null = null;
  let rememberMe = false;
  let showResetForm = false;
  let resetEmail = '';
  let resetLoading = false;
  let resetSuccess = false;
  let resetError: string | null = null;

  // Pre-fill the email field if stored in localStorage
  onMount(() => {
    // Clear any existing auth data to ensure a fresh login
    clearSupabaseAuth();
    
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      email = storedEmail;
      rememberMe = true; // Set the checkbox to checked
    }
  });
  
  async function handleSignIn() {
    if (!email || !password || !companyName) {
      error = 'Please fill in all fields';
      return;
    }

    loading = true;
    error = null;

    try {
      // First, check if the company exists
      const { data: companies, error: companyError } = await supabase
        .from('companies')
        .select('id, name')
        .ilike('name', companyName.trim())
        .maybeSingle();

      if (companyError) {
        console.error('Company lookup error:', companyError);
        throw new Error('Failed to verify company');
      }

      if (!companies) {
        error = 'Company not found. Please check the company name and try again.';
        loading = false;
        return;
      }

      // Sign in the user
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          error = 'Invalid email or password';
        } else {
          error = 'Failed to sign in. Please try again.';
        }
        return;
      }

      if (data?.user) {
        // After successful sign in, update the user's company association if needed
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ company_id: companies.id })
          .eq('id', data.user.id)
          .is('company_id', null);

        if (profileError) {
          console.error('Failed to update company association:', profileError);
        }

        // Remember the user's email if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }

        // Redirect to dashboard after successful sign in
        goto('/dashboard');
      }
    } catch (e) {
      console.error('Sign in error:', e);
      error = e instanceof Error ? e.message : 'An unexpected error occurred';
    } finally {
      loading = false;
    }
  }

  async function handleResetPassword() {
    if (!resetEmail) {
      resetError = 'Please enter your email address';
      return;
    }

    resetLoading = true;
    resetError = null;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      resetSuccess = true;
    } catch (e) {
      console.error('Password reset error:', e);
      resetError = e instanceof Error ? e.message : 'Failed to send reset email';
    } finally {
      resetLoading = false;
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
  <!-- Back Button -->
  <button
    class="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 text-gray-600 
           hover:text-gray-900 transition-colors"
    on:click={() => goto('/')}
  >
    <ArrowLeft class="w-5 h-5" />
    <span>{$_('common.back')}</span>
  </button>

  <div 
    class="w-full max-w-md"
    in:fly={{ y: 20, duration: 600 }}
    out:fade
  >
    <div class="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 space-y-6">
      <!-- Logo -->
      <div class="flex items-center justify-center space-x-3 mb-8">
        <div class="brand-logo">
          <Orbit class="w-6 h-6" />
        </div>
        <span class="text-2xl font-medium text-gray-900">MinuteWalk</span>
      </div>

      <div class="text-center">
        <h1 class="text-2xl font-light text-gray-900">{$_('auth.welcomeBack')}</h1>
        <p class="text-gray-500 mt-2">{$_('auth.signInToContinue')}</p>
      </div>

      {#if showResetForm}
        <div class="space-y-4" transition:fly={{ y: 10, duration: 300 }}>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="resetEmail">
              {$_('auth.email')}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="resetEmail"
                type="email"
                bind:value={resetEmail}
                class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={$_('auth.enterEmail')}
                required
              />
            </div>
          </div>

          {#if resetError}
            <div 
              class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"
              transition:fly={{ y: 10, duration: 300 }}
            >
              <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{resetError}</span>
            </div>
          {/if}

          {#if resetSuccess}
            <div 
              class="bg-green-50 text-green-600 p-4 rounded-lg"
              transition:fly={{ y: 10, duration: 300 }}
            >
              <p>{$_('auth.passwordResetSent')}</p>
            </div>
          {/if}

          <div class="flex flex-col space-y-4">
            <button
              class="w-full py-3 px-4 bg-blue-500 text-white rounded-xl
                     hover:bg-blue-600 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
              on:click={handleResetPassword}
              disabled={resetLoading}
            >
              {#if resetLoading}
                <span class="flex items-center justify-center space-x-2">
                  <Loader2 class="w-5 h-5 animate-spin" />
                  <span>Installing...</span>
                </span>
              {:else}
                {$_('auth.sendResetInstructions')}
              {/if}
            </button>

            <button
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              on:click={() => showResetForm = false}
            >
              {$_('auth.backToSignIn')}
            </button>
          </div>
        </div>
      {:else}
        <form class="space-y-6" on:submit|preventDefault={handleSignIn}>
          <!-- Company Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="company">
              {$_('auth.companyName')}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Orbit class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="company"
                type="text"
                bind:value={companyName}
                class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={$_('auth.companyName')}
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
              {$_('auth.email')}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                bind:value={email}
                class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={$_('auth.email')}
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="password">
              {$_('auth.password')}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                bind:value={password}
                class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={$_('auth.password')}
                required
              />
            </div>
          </div>

          {#if error}
            <div 
              class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"
              transition:fly={{ y: 10, duration: 300 }}
            >
              <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          {/if}

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              bind:checked={rememberMe}
              class="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label for="rememberMe" class="ml-2 text-sm text-gray-700">{$_('auth.rememberMe')}</label>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-500 text-white rounded-xl
                   hover:bg-blue-600 focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {#if loading}
              <span class="flex items-center justify-center space-x-2">
                <Loader2 class="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </span>
            {:else}
              {$_('auth.signIn')}
            {/if}
          </button>
        </form>
{#if false}
        <!-- Forgot Password Link -->
        <div class="mt-4 text-center">
          <button
            class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            on:click={() => showResetForm = true}
         >
            {$_('auth.forgotPassword')}
          </button>
        </div>
      {/if}
           {/if}
    </div>
  </div>
</div>