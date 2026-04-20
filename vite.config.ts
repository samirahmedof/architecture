import path from 'node:path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type Plugin } from 'vite';
import checker from 'vite-plugin-checker';

/*
 * `rem(N)` build-time helper — restores the SCSS ergonomic.
 * Author CSS:  font-size: rem(14);   →   Bundle:  font-size: 0.875rem;
 * Build-time only; output is byte-identical to hand-written rem values.
 */
function remHelper(): Plugin {
  return {
    name: 'css-rem-helper',
    enforce: 'pre',
    transform(code, id) {
      const cleanId = id.split('?')[0];
      if (!cleanId.endsWith('.css')) return null;
      if (!/\brem\(\s*-?\d/.test(code)) return null;
      const out = code.replace(/\brem\(\s*(-?\d+(?:\.\d+)?)\s*\)/g, (_, n) => {
        const v = Number(n) / 16;
        return v === 0 ? '0' : `${v}rem`;
      });
      return { code: out, map: null };
    },
  };
}

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
      checker({
        typescript: true,
        overlay: { initialIsOpen: false },
      }),
      remHelper(),
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
