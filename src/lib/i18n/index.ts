import { browser } from '$app/environment';
import { init, register, locale, dictionary } from 'svelte-i18n';
import { writable } from 'svelte/store';

// Register locales
register('en', () => import('./locales/en.json'));
register('de', () => import('./locales/de.json'));
register('tr', () => import('./locales/tr.json'));

// Create a store to track if we're on the landing page
export const isLandingPage = writable(false);

// Initialize i18n with proper error handling
export function initI18n() {
  try {
    init({
      fallbackLocale: 'en',
      initialLocale: browser ? getInitialLocale() : 'en',
    });
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    // Fallback to English if initialization fails
    if (browser) {
      locale.set('en');
    }
  }
}

// Get initial locale from localStorage or browser settings
function getInitialLocale() {
  // Check if we're on the landing page (/)
  const isLanding = window.location.pathname === '/';
  isLandingPage.set(isLanding);
  
  // Always use English for landing page
  if (isLanding) {
    return 'en';
  }
  
  // First, check localStorage
  const savedLocale = localStorage.getItem('language');
  if (savedLocale) {
    return ['en', 'de', 'tr'].includes(savedLocale) ? savedLocale : 'en';
  }

  // Then, check browser language
  const browserLocale = navigator.language.split('-')[0];
  return ['en', 'de', 'tr'].includes(browserLocale) ? browserLocale : 'en';
}

// Set locale and save to localStorage with error handling
export function setLocale(newLocale: string) {
  if (browser) {
    // Check if we're on the landing page
    const isLanding = window.location.pathname === '/';
    isLandingPage.set(isLanding);
    
    // Don't change language on landing page
    if (isLanding) {
      return;
    }
    
    try {
      localStorage.setItem('language', newLocale);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }
  locale.set(newLocale);
}

// Get current locale
function getLocale() {
  // Always return English for landing page
  if (browser && window.location.pathname === '/') {
    return 'en';
  }
  
  // Otherwise return saved language or default to English
  return browser ? localStorage.getItem('language') || 'en' : 'en';
}

// Export svelte-i18n stores for use in components
export { locale, dictionary };