const path = require('node:path');

const { Resolver } = require('@parcel/plugin');

module.exports = new Resolver({
  async resolve({ specifier, dependency }) {
    // site.webmanifest
    // if (specifier === 'special-module') {
    //   return {
    //     filePath: path.join(__dirname, 'special-module.js')
    //   };
    // }
    process.stdout.write('-----------------------------');
    process.stdout.write('\n');
    process.stdout.write(dependency.sourcePath || 'no source path');
    process.stdout.write('\n');
    process.stdout.write(specifier || 'no specifier');
    process.stdout.write('\n');

    // Let the next resolver in the pipeline handle this dependency.
    return null;
  }
});




/*
const process = require('node:process');

const { Bundler } = require('@parcel/plugin');

process.stdout.write('Bundler Enter');

module.exports = new Bundler({
  async bundle(bundle) {
    process.stdout.write('-----------------------------');
    process.stdout.write('bundle');
    const { bundleGraph, graph } = bundle;
    process.stdout.write(String(bundleGraph));
    process.stdout.write(String(graph));
  },

  async optimize(bundle) {
    process.stdout.write('-----------------------------');
    process.stdout.write('optimize');
    const { bundleGraph, graph } = bundle;
    process.stdout.write(String(bundleGraph));
    process.stdout.write(String(graph));
  },
});

/*
import path from 'node:path';
import process from 'node:process';

import { Namer } from '@parcel/plugin';

const ignore_webmanifest = new Namer({
  name({ bundle }) {
    // if (bundle.type === 'webmanifest') {
    const file_path = bundle.getMainEntry().filePath;
    const file_name = path.basename(file_path);
    process.stdout.write(`${file_name}\n`);
    // return `images/${path.basename(file_path)}`;
    // }

    // Allow the next namer to handle this bundle.
    return null;
  },
});

export default ignore_webmanifest;
*/
