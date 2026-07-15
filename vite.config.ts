import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { lingui } from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      // @ts-expect-error: babel property is valid for @vitejs/plugin-react
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    lingui(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['@lingui/core', '@lingui/react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom') || id.includes('react-router'))
              return 'react-vendor';
            if (id.includes('@tanstack')) return 'tanstack-vendor';
            if (id.includes('recharts')) return 'chart-vendor';
            if (
              id.includes('lucide-react') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge') ||
              id.includes('date-fns') ||
              id.includes('zod') ||
              id.includes('react-hook-form')
            )
              return 'ui-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
});
