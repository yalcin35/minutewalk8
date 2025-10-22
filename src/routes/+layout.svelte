<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { user, isLoading } from '$lib/supabase';
  import Sidebar from '$lib/components/Sidebar.svelte';
  
  const publicRoutes = ['/', '/signin', '/pricing', '/privacy', '/contact'];
  
  let isSidebarOpen = true;
  let currentPath = '';
  let unsubscribeUser: () => void;
  let initialized = false;
  
  onMount(() => {
    try {
      const savedState = localStorage.getItem('sidebarOpen');
      isSidebarOpen = savedState ? JSON.parse(savedState) : true;
    } catch (e) {
      console.error('LocalStorage error:', e);
    }
    
    unsubscribeUser = user.subscribe(($user) => {
      if (!initialized || get(isLoading)) return;
      
      try {
        const $pageValue = get(page);
        const path = ($pageValue?.url?.pathname || '/').split('?')[0];
        const isPublicRoute = publicRoutes.includes(path);
        
        if (!$user && !isPublicRoute) {
          goto('/signin');
        } else if ($user && path === '/signin') {
          goto('/dashboard');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      }
    });
    
    setTimeout(() => initialized = true, 100);
  });
  
  onDestroy(() => {
    if (unsubscribeUser) unsubscribeUser();
  });
  
  $: {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
      }
    } catch (e) {
      console.error('LocalStorage error:', e);
    }
  }
  
  $: {
    try {
      currentPath = (get(page)?.url?.pathname || '').split('?')[0];
    } catch (e) {
      currentPath = '';
      console.error('Page store error:', e);
    }
  }
  
  $: isPublicRoute = publicRoutes.includes(currentPath);
</script>

<div class="min-h-screen flex flex-col">
  {#if !initialized || get(isLoading)}
    <div class="flex items-center justify-center h-screen">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else if get(user) && !isPublicRoute}
    <Sidebar bind:isOpen={isSidebarOpen} />
    <div class={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
      <main class="flex-1">
        <slot />
      </main>
    </div>
  {:else}
    <main class="flex-1">
      <slot />
    </main>
  {/if}
</div>