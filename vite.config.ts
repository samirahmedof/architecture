import path from 'node:path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { patchCssModules } from 'vite-css-modules';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    plugins: [
      patchCssModules({ generateSourceTypes: true, declarationMap: true }),
      tanstackRouter({
        routesDirectory: './src/routes',
        generatedRouteTree: './src/routes/routeTree.gen.ts',
        routeFileIgnorePattern: 'routeTree.gen.ts',
        quoteStyle: 'single',
      }),
      react(),
      checker({
        typescript: true,
        overlay: { initialIsOpen: false },
      }),
      !isDev &&
        visualizer({
          filename: 'stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
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
            setCommits: { auto: true },
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
      target: 'es2022',
      minify: 'oxc',
      cssMinify: 'lightningcss',
      sourcemap: true,
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(
          browserslist('>= 0.5%, last 2 versions, Firefox ESR, not dead'),
        ),
        drafts: {
          customMedia: true,
        },
        cssModules: {
          pattern: '[name]__[local]__[hash]',
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
