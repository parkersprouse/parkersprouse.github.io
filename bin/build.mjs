import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { copyFile, readFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

try {
  /**
   * Configuration
   */
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const __root_dir = resolve(__dirname, '..');
  const __src_dir = join(__root_dir, 'src');
  const css_input = join(__src_dir, 'styles.css');
  const __dist_dir = join(__root_dir, 'dist');

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
   * [Step 1] Clean Old Files
   */
  console.log('[Step 1] Clean Old Files');
  await rm(__dist_dir, { recursive: true, force: true });

  /**
   * [Step 2] PostCSS
   */
  console.log('[Step 2] PostCSS');
  const css_contents = await readFile(css_input, 'utf8');
  const css_processor = postcss([autoprefixer, postcssPresetEnv()]);
  const { css } = await css_processor.process(css_contents, { from: css_input });

  /**
   * [Step 3] esbuild - CSS
   */
  console.log('[Step 3] esbuild - CSS');
  await build({
    ...shared_config,
    outfile: join(__dist_dir, 'styles.css'),
    stdin: {
      contents: css,
      loader: 'css',
      resolveDir: __src_dir,
      sourcefile: css_input,
    },
  });

  /**
   * [Step 4] esbuild - JS
   */
  console.log('[Step 4] esbuild - JS');
  await build({
    ...shared_config,
    entryPoints: [join(__src_dir, 'scripts.js')],
    format: 'iife',
    outdir: __dist_dir,
    platform: 'browser',
  });

  /**
   * [Step 5] Copy Static Files
   */
  await copyFile(
    join(__src_dir, 'CNAME'),
    join(__dist_dir, 'CNAME'),
  );
  await copyFile(
    join(__src_dir, 'index.html'),
    join(__dist_dir, 'index.html'),
  );
  await copyFile(
    join(__src_dir, 'Parker_Sprouse_Resume.pdf'),
    join(__dist_dir, 'Parker_Sprouse_Resume.pdf'),
  );
} catch (e) {
  console.error('Build script failed to complete:');
  console.error(e);
}
