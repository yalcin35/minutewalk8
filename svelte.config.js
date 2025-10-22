import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(), // Should come first

  kit: {
    adapter: adapter(),
    alias: {
      $lib: './src/lib',
      $components: './src/components',
    },
  },
};

export default config;
