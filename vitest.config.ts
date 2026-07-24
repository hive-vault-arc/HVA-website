import { fileURLToPath } from 'node:url';
import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/i18n/navigation',
        replacement: fileURLToPath(new URL('./src/test/mocks/i18n-navigation.tsx', import.meta.url)),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: 'next/navigation',
        replacement: fileURLToPath(new URL('./src/test/mocks/next-navigation.ts', import.meta.url)),
      },
      {
        find: 'next/headers',
        replacement: fileURLToPath(new URL('./src/test/mocks/next-headers.ts', import.meta.url)),
      },
      {
        find: 'server-only',
        replacement: fileURLToPath(new URL('./src/test/mocks/server-only.ts', import.meta.url)),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});
