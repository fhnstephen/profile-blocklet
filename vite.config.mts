/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), createBlockletPlugin(), svgr(), commonjs()],
    build: {
      // 禁止 preload 可以解决 js 的请求没有 referer 的问题
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      server: {
        deps: {
          inline: ['@blocklet/js-sdk'],
        },
      },
      setupFiles: ['tests/setup.ts'],
    },
  };
});
