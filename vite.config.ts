import path from 'node:path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      !isDev &&
        visualizer({
          filename: 'stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
      // Sentry plugin for source maps and release tracking (production only)
      isProd &&
        sentryVitePlugin({
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
          sourcemaps: {
            assets: './dist/**',
            ignore: ['node_modules'],
            filesToDeleteAfterUpload: './dist/**/*.map',
          },
          release: {
            name: process.env.SENTRY_RELEASE || `app@${Date.now()}`,
            setCommits: {
              auto: true,
            },
          },
        }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'es2022',
      minify: 'esbuild',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
                return 'react-core';
              }
              if (id.includes('@tanstack')) {
                return 'tanstack-vendor';
              }
              if (id.includes('axios') || id.includes('zustand') || id.includes('dayjs')) {
                return 'utils-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [path.resolve(__dirname, 'src')],
        },
      },
      devSourcemap: true,
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/core/test/setup.ts',
      css: true,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      open: true,
    },
  };
});
