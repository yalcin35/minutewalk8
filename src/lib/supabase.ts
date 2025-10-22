import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { setLocale } from '$lib/i18n';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

// Auth cleanup function
const clearSupabaseAuth = () => {
  if (!browser) return;
  try {
    setLocale('en');
    Object.keys(localStorage)
      .filter(key => key.startsWith('sb-'))
      .forEach(key => localStorage.removeItem(key));
  } catch (e) {
    console.error('Auth cleanup error:', e);
  }
};

// Create client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: browser,
    detectSessionInUrl: browser,
    storage: browser ? localStorage : undefined
  }
});

// Stores with initialization guards
export const user = writable<User | null>(null);
export const isLoading = writable<boolean>(true);

if (browser) {
  // Initialize auth state
  const initializeAuth = async () => {
    try {
      isLoading.set(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      user.set(session?.user ?? null);
    } catch (error) {
      console.error('Auth initialization error:', error);
      clearSupabaseAuth();
      user.set(null);
    } finally {
      isLoading.set(false);
    }
  };

  // Auth state listener
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    try {
      isLoading.set(true);
      if (event === 'SIGNED_OUT') clearSupabaseAuth();
      user.set(session?.user ?? null);
    } catch (error) {
      console.error('Auth state change error:', error);
    } finally {
      isLoading.set(false);
    }
  });

  initializeAuth();

  // Cleanup on hot module reload
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      subscription?.unsubscribe();
    });
  }
}

export { clearSupabaseAuth };
