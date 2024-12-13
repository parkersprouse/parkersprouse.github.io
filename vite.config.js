import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'custom',
  build: {
    assetsDir: '',
    copyPublicDir: true,
    cssMinify: 'lightningcss',
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2018',
  },
  css: {
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
    devSourcemap: true,
    transformer: 'lightningcss',
  },
});
