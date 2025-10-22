<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';
  import { 
    Orbit,
    LayoutDashboard, 
    ClipboardCheck, 
    Users,
    Shield,
    BadgeCheck,
    DollarSign,
    Truck,
    Leaf,
    Plus, 
    Settings, 
    LogOut, 
    ChevronsLeft, 
    ChevronsRight,
    History
  } from 'lucide-svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { clearSupabaseAuth } from '$lib/supabase';

  export let isOpen = true;
  let companyLogo: string | null = null;

  const menuItems = [
    { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { href: '/audit/setup', labelKey: 'nav.newWalk', icon: ClipboardCheck },
    { href: '/checkin', labelKey: 'nav.sqcdpe', icon: Plus },
    { href: '/history', labelKey: 'nav.viewHistory', icon: History },
    { href: '/settings', labelKey: 'nav.settings', icon: Settings }
  ];

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return;
    }
    clearSupabaseAuth();
    goto('/signin');
  }

  function toggleSidebar() {
    isOpen = !isOpen;
  }

  function isActive(href: string): boolean {
    return $page.url.pathname === href || 
           ($page.url.pathname.startsWith(href) && href !== '/');
  }

  onMount(async () => {
    try {
      // Fetch company logo
      const { data: profile } = await supabase
        .from('profiles')
        .select('companies (logo_url)')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profile?.companies?.logo_url) {
        companyLogo = profile.companies.logo_url;
      }
    } catch (error) {
      console.error('Error loading company logo:', error);
    }
  });
</script>

<div 
  class={`h-screen fixed top-0 left-0 bg-white shadow-xl transition-all duration-300 z-40
           ${isOpen ? 'w-64' : 'w-20'}`}
>
  <!-- Toggle Button -->
  <button
    class="absolute -right-3 top-20 w-6 h-12 bg-white rounded-r-lg shadow-md
           flex items-center justify-center"
    on:click={toggleSidebar}
  >
    <svelte:component 
      this={isOpen ? ChevronsLeft : ChevronsRight}
      class="w-4 h-4 text-gray-500"
    />
  </button>

  <!-- Brand -->
  <div class="px-6 py-8 flex items-center space-x-3">
    <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 overflow-hidden">
      {#if companyLogo}
        <img src={companyLogo} alt="Company logo" class="w-full h-full object-cover" />
      {:else}
        <Orbit class="w-6 h-6" />
      {/if}
    </div>
    {#if isOpen}
      <h1 class="text-xl font-bold text-gray-900">MinuteWalk</h1>
    {/if}
  </div>

  <!-- Navigation -->
  <nav class="px-4 py-4">
    <ul class="space-y-2">
      {#each menuItems as item}
        <li class="relative">
          <a
            href={item.href}
            class={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors
                   ${isActive(item.href) 
                     ? 'bg-blue-50 text-blue-600' 
                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <svelte:component this={item.icon} class="w-5 h-5" />
            {#if isOpen}
              <span>{$_(item.labelKey)}</span>
              {#if item.labelKey === 'nav.sqcdpe'}
                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                  <div class="w-2 h-2 rounded-full bg-red-500" title="Critical"></div>
                  <div class="w-2 h-2 rounded-full bg-yellow-500" title="Needs Attention"></div>
                  <div class="w-2 h-2 rounded-full bg-green-500" title="Good"></div>
                </div>
              {/if}
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  
  <!-- Logout at bottom -->
  <div class="absolute bottom-8 left-0 right-0 px-4">
    <button
      class={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl
             text-red-600 hover:bg-red-50 transition-colors`}
      on:click={handleLogout}
    >
      <LogOut class="w-5 h-5" />
      {#if isOpen}
        <span>{$_('common.logout')}</span>
      {/if}
    </button>
  </div>
</div>

<!-- Backdrop for small screens -->
{#if isOpen}
  <div 
    class="lg:hidden fixed inset-0 bg-black/20 z-30"
    on:click={toggleSidebar}
    transition:fade={{ duration: 200 }}
  ></div>
{/if}