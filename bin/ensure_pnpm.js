#!/usr/bin/env node

const red = (str) => `\u001B[1;31m${str}\u001B[0;0m`;

if (!/^.*pnpm.*$/.test(process.env.npm_execpath)) {
  console.error(red('*'.repeat(45)));
  console.error(red('* You must use pnpm as your package manager *'));
  console.error(red('*'.repeat(45)), '\n');
  process.exit(1);
}
