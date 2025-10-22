import { browser } from '$app/environment';
import { initI18n } from '$lib/i18n';

// Initialize i18n as early as possible
// Initialize i18n as early as possible
export const load = async () => {
  if (browser) {
    initI18n();
  }
  
  return {};
};