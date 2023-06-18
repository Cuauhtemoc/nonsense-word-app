import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import liveReload from 'vite-plugin-live-reload';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
  ],
  
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
  ssr: {
    noExternal: ['@inertiajs/server'],
  },
});
