import fs from 'node:fs';
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
 * LightningCSS resolves @custom-media at BUILD time and PER FILE — defs in
 * one CSS file are not visible from another. CSS Modules (`*.module.css`) are
 * each their own LightningCSS unit, so a global `@custom-media --bp-md` def
 * in tokens/media.css is invisible inside grid.module.css.
 *
 * This plugin reads tokens/media.css once and prepends its `@custom-media`
 * lines to every CSS file that references one — single source of truth, zero
 * duplication in source. Stripped from output by LightningCSS, so bundle size
 * is byte-identical to literal media queries.
 */
const customMediaPath = path.resolve(__dirname, 'src/assets/styles/tokens/media.css');

function prependCustomMedia(): Plugin {
  let defs = '';
  return {
    name: 'prepend-custom-media',
    enforce: 'pre',
    buildStart() {
      const raw = fs.readFileSync(customMediaPath, 'utf8');
      defs = raw
        .split('\n')
        .filter((l) => /^\s*@custom-media\s/.test(l))
        .join('\n');
      this.addWatchFile(customMediaPath);
    },
    transform(code, id) {
      const cleanId = id.split('?')[0];
      // Only module CSS files need the prepend. Global stylesheets reach
      // @custom-media defs through index.css's @import chain — prepending
      // there would push subsequent @imports past a rule and break the
      // "@import must precede all rules" CSS constraint.
      if (!cleanId.endsWith('.module.css')) return null;
      if (!/@media\s*\(\s*--/.test(code)) return null;
      return { code: `${defs}\n${code}`, map: null };
    },
  };
}

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
      prependCustomMedia(),
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
