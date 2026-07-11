import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { lingui } from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), lingui(), tailwindcss()],
  optimizeDeps: {
    include: ['@lingui/core', '@lingui/react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
});
