import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Get the user's preferred language from the cookie
  let lang = event.cookies.get('language') || 'en';
  
  // Always use English for the landing page
  if (event.url.pathname === '/') {
    lang = 'en';
  }
  
  // Replace %lang% in the HTML template with the actual language
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
  
  return response;
};