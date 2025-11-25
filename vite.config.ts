import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

import tsconfigPaths from 'vite-tsconfig-paths';

// @ts-ignore
// @ts-ignore
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Bundle Splitting
                    vendor: ['react', 'react-dom', 'zustand', 'axios', 'dayjs'],
                    ui: ['@radix-ui/react-slot', 'lucide-react', 'clsx'],
                    query: ['@tanstack/react-query', '@tanstack/react-router'],
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                silenceDeprecations: ['legacy-js-api']
            } as any,
        }
    },
    server: {
        port: 3000, // Portu sabitləyək (5173/5174 gəzməsin)
        strictPort: false, // Əgər 3000 tutulubsa, növbətiyə keçər
        open: true, // Server hazır olan kimi avtomatik brauzeri açsın
    },
})
