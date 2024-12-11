import { defineConfig } from '@rsbuild/core';

const source_map =
  process.env.NODE_ENV === 'development'
    // Use a more performant source map format for development
    ? 'cheap-module-source-map'
    // Use a high quality source map format for production
    : 'source-map';

export default defineConfig({
  html: {
    inject: false,
    meta: {
      charset: false,
      viewport: false,
    },
    scriptLoading: 'defer',
    template: './src/index.html',
    templateParameters: {
      resume_link: '/files/Parker_Sprouse_Resume.pdf',
    },
  },
  output: {
    cleanDistPath: true,
    copy: [
      { from: 'src/CNAME' },
      { from: 'src/favicon' },
      { from: 'src/files', to: 'files' }, // 'files/[path][name].[contenthash][ext]'
    ],
    distPath: {
      root: 'dist',
      html: './',
      js: './',
      css: './',
      svg: 'assets',
      font: 'assets',
      image: 'assets',
      media: 'assets',
      assets: 'assets',
    },
    injectStyles: false,
    minify: {
      css: true,
      js: true,
    },
    polyfill: 'usage',
    sourceMap: {
      css: source_map,
      js: source_map,
    },
    target: 'web',
  },
  performance: {
    removeConsole: true,
  },
  source: {
    entry: {
      index: './src/scripts/index.js',
    },
  },
  tools: {
    lightningcssLoader: {
      drafts: {
        customMedia: true,
      },
    },
    rspack: {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: 'builtin:lightningcss-loader',
              },
            ],
          },
        ],
      },
    },
  },
});
