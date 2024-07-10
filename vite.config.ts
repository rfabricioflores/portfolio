/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { normalizePath } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      '~': normalizePath(resolve(__dirname, 'src/app/styles')),
      '@components': normalizePath(resolve(__dirname, 'src/app/components')),
      '@assets': normalizePath(resolve(__dirname, 'src/assets')),
    },
  },
  plugins: [
    analog({
      nitro: {
        serveStatic: false,
      },
      prerender: {
        routes: async () => ['/'],
      },
      vite: {
        inlineStylesExtension: 'scss',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
