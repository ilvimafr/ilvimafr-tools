#!/usr/bin/env node

import { readdirSync, renameSync } from 'node:fs';
import chalk from 'chalk';

const regex = new RegExp(process.argv[2], 'gi');
const replaceStr = process.argv[3];
const isReplace = process.argv[4] === '-replace';

// Read directories
const files = readdirSync('./', {
  withFileTypes: true,
});
const dirs = files
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

// Get maximum length for beautiful output
const maxDirLength = dirs.reduce((result, name) => {
  return Math.max(result, name.length);
}, 0);

// Create new names
let newDirs = dirs.map((dir) => {
  return dir.replace(regex, replaceStr.replaceAll('#', '$')).trim();
});

// Fix duplicates
const duplicates = {};
newDirs.forEach((dir) => {
  duplicates[dir] ??= {
    count: 0,
    length: 0,
  };
  ++duplicates[dir].length;
});

newDirs = newDirs.map((dir) => {
  if (duplicates[dir].length > 1) {
    return `${dir} ${++duplicates[dir].count}`;
  }
  return dir;
});

// Rename
newDirs.forEach((newDir, index) => {
  if (isReplace) {
    renameSync(`./${dirs[index]}`, `./${newDir}`, {
      dirs: true
    });
  }

  // Highlight removed parts
  const replacedDir = dirs[index]
    .padEnd(maxDirLength, ' ')
    .replace(regex, chalk.red('$&'));

  console.log(
    chalk.white(`"${replacedDir}"`),
    chalk.whiteBright(` => `),
    chalk.yellow(`"${newDir}"`)
  );
});
