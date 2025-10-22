// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { sveltekit } from "file:///home/project/node_modules/@sveltejs/kit/src/exports/vite/index.js";
var vite_config_default = defineConfig({
  plugins: [
    sveltekit({
      hot: {
        preserveLocalState: false
      }
    })
  ],
  build: {
    sourcemap: true,
    minify: false,
    // Disable minification to help with sourcemap accuracy
    rollupOptions: {
      output: {
        manualChunks: void 0
      }
    }
  },
  optimizeDeps: {
    exclude: ["@sveltejs/kit"]
  },
  server: {
    fs: {
      strict: false
    },
    hmr: {
      timeout: 5e3
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBzdmVsdGVraXQoe1xuICAgICAgICAgICAgaG90OiB7XG4gICAgICAgICAgICAgICAgcHJlc2VydmVMb2NhbFN0YXRlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICBtaW5pZnk6IGZhbHNlLCAvLyBEaXNhYmxlIG1pbmlmaWNhdGlvbiB0byBoZWxwIHdpdGggc291cmNlbWFwIGFjY3VyYWN5XG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIG1hbnVhbENodW5rczogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICBleGNsdWRlOiBbJ0BzdmVsdGVqcy9raXQnXVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAgIGZzOiB7XG4gICAgICAgICAgICBzdHJpY3Q6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGhtcjoge1xuICAgICAgICAgICAgdGltZW91dDogNTAwMFxuICAgICAgICB9XG4gICAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxTQUFTLGlCQUFpQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxVQUFVO0FBQUEsTUFDTixLQUFLO0FBQUEsUUFDRCxvQkFBb0I7QUFBQSxNQUN4QjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ0osY0FBYztBQUFBLE1BQ2xCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNWLFNBQVMsQ0FBQyxlQUFlO0FBQUEsRUFDN0I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLElBQUk7QUFBQSxNQUNBLFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDRCxTQUFTO0FBQUEsSUFDYjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
