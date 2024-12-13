import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'custom',
  base: '/',
  build: {
    assetsDir: '',
    copyPublicDir: true,
    cssMinify: 'lightningcss',
    emptyOutDir: true,
    outDir: 'dist',
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
