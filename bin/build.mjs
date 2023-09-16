import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { createHash } from 'node:crypto';
import { copyFile, readFile, rm, writeFile } from 'node:fs/promises';
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
  const __dist_dir = join(__root_dir, 'dist');
  const css_input = join(__src_dir, 'styles.css');
  const js_input = join(__src_dir, 'scripts.js');

  const shared_config = {
    bundle: true,
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
  const css_buffer = await readFile(css_input);
  const css_fingerprint = createHash('sha256').update(css_buffer).digest('hex');
  const hashed_css = `styles.${css_fingerprint}.css`;
  await build({
    ...shared_config,
    outfile: join(__dist_dir, hashed_css),
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
  const js_buffer = await readFile(js_input);
  const js_fingerprint = createHash('sha256').update(js_buffer).digest('hex');
  await build({
    ...shared_config,
    entryNames: `[name].${js_fingerprint}`,
    entryPoints: [js_input],
    format: 'iife',
    outdir: __dist_dir,
    platform: 'browser',
  });

  /**
   * [Step 5] Copy Static Files
   */
  const hashed_resume = `Parker_Sprouse_Resume.${Date.now()}.pdf`;
  await copyFile(
    join(__src_dir, 'Parker_Sprouse_Resume.pdf'),
    join(__dist_dir, hashed_resume),
  );
  await copyFile(
    join(__src_dir, 'CNAME'),
    join(__dist_dir, 'CNAME'),
  );

  const src_html_contents = await readFile(join(__src_dir, 'index.html'), 'utf8');
  await writeFile(
    join(__dist_dir, 'index.html'),
    src_html_contents
      .replace(/<%{RESUME_FILE}%>/g, hashed_resume)
      .replace(/<%{SCRIPTS_FILE}%>/g, js_fingerprint)
      .replace(/<%{STYLES_FILE}%>/g, css_fingerprint),
    'utf8',
  );
} catch (e) {
  console.error('Build script failed to complete:');
  console.error(e);
}
