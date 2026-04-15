import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

const resolvedViteConfig = viteConfig({ mode: 'test', command: 'serve' });

export default mergeConfig(
  resolvedViteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/testing/setup.ts',
      css: true,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }),
);
