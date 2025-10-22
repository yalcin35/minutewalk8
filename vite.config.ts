import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [
        sveltekit({
            hot: {
                preserveLocalState: false
            }
        })
    ],
    build: {
        sourcemap: true,
        minify: false, // Disable minification to help with sourcemap accuracy
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    },
    optimizeDeps: {
        exclude: ['@sveltejs/kit']
    },
    server: {
        fs: {
            strict: false
        },
        hmr: {
            timeout: 5000
        }
    }
});