import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/.test(id)) {
            return 'vendor-react';
          }

          if (/[\\/]node_modules[\\/](@tanstack|zustand|axios)[\\/]/.test(id)) {
            return 'vendor-data';
          }

          if (/[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/.test(id)) {
            return 'vendor-forms';
          }

          if (/[\\/]node_modules[\\/](lucide-react|framer-motion|recharts)[\\/]/.test(id)) {
            return 'vendor-ui';
          }

          return 'vendor-misc';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
});
