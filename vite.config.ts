import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Bundle Splitting
          vendor: ['react', 'react-dom', 'zustand', 'axios', 'dayjs'],
          ui: ['lucide-react', 'clsx'],
          query: ['@tanstack/react-query', '@tanstack/react-router'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      } as any,
    },
  },
  server: {
    port: 3000, // Portu sabitləyək (5173/5174 gəzməsin)
    strictPort: false, // Əgər 3000 tutulubsa, növbətiyə keçər
    open: true, // Server hazır olan kimi avtomatik brauzeri açsın
  },
});
