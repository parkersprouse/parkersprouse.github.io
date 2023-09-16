import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';


/**
 * Configuration
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const __root_dir = resolve(__dirname, '..', 'src');
const __src_dir = join(__root_dir, 'src');
const css_input = join(__src_dir, 'styles.css');

const shared_config = {
  bundle: true,
  entryNames: '[name]',
  loader: {
    '.eot': 'copy',
    '.svg': 'copy',
    '.ttf': 'copy',
    '.woff': 'copy',
    '.woff2': 'copy',
  },
  minify: true,
  sourcemap: true,
  target: [
    'es6',
  ],
  write: true,
};

/**
 * [Step 1] PostCSS
 */
console.log('[Step 1] PostCSS');
const css_contents = await readFile(css_input, 'utf8');
const css_processor = postcss([autoprefixer, postcssPresetEnv()]);
const { css } = await css_processor.process(css_contents, { from: css_input });

/**
 * [Step 2] esbuild - CSS
 */
console.log('[Step 2] esbuild - CSS');
await build({
  ...shared_config,
  outfile: join(__root_dir, 'dist', 'styles.css'),
  stdin: {
    contents: css,
    loader: 'css',
    resolveDir: __src_dir,
    sourcefile: css_input,
  },
});

/**
 * [Step 3] esbuild - JS
 */
console.log('[Step 3] esbuild - JS');
await build({
  ...shared_config,
  entryPoints: [join(__src_dir, 'scripts.js')],
  format: 'iife',
  outdir: join(__root_dir, 'dist'),
  platform: 'browser',
});


/* LEGACY */

/**
 * [Step 4] PurgeCSS
 */
/*
console.log('[Step 4] PurgeCSS');
const purged_css_results = (await new PurgeCSS().purge({
  content: [
    join(__root_dir, '**', '*.html'),
    join(__root_dir, 'lib', '**', '*.js'),
    join(__root_dir, 'routes', '**', '*.js'),
  ],
  css: [output_styles],
  sourceMap: { to: output_styles },
}))[0];
await writeFile(purged_css_results.file, purged_css_results.css, { encoding: 'utf8', flag: 'w' });
await writeFile(join(__output_dir, 'styles.css.map'), purged_css_results.sourceMap, { encoding: 'utf8', flag: 'w' });
*/
