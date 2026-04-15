import path from 'node:path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    plugins: [
      tanstackRouter({
        routesDirectory: './src/routes',
        generatedRouteTree: './src/routes/routeTree.gen.ts',
        routeFileIgnorePattern: 'routeTree.gen.ts',
        quoteStyle: 'single',
      }),
      react(),
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
      tsconfigPaths: true,
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // target: 'es2022',
      minify: 'oxc',
      sourcemap: true,
      // rolldownOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
      //           return 'react-core';
      //         }
      //         if (id.includes('@tanstack')) {
      //           return 'tanstack-vendor';
      //         }
      //         if (id.includes('axios') || id.includes('zustand') || id.includes('dayjs')) {
      //           return 'utils-vendor';
      //         }
      //         return 'vendor';
      //       }
      //     },
      //   },
      // },
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
    server: {
      port: 3000,
      strictPort: true,
      open: true,
    },
  };
});
