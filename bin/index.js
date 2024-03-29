#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const parser = require('../');
const { generate } = require('../lib/generate');

let program = {};
let exitCode;
const args = process.argv.slice(2);

args.forEach((arg, i) => {
  switch (arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      exitCode = 0;
      break;
    case '-h':
    case '--help':
    case 'help':
      console.log(`` + // eslint-disable-line
        `
Usage: tap-html [options]

Commands:
  -h, --help, help                Output usage information
  -v, --version, version          Output the version number

Options:
  -o, --outFile [path]            If instead of piping content you want it to be written to an html file locally please specify the relative path
`);
      exitCode = 0;
      break;
    case '-o':
    case '--out':
      program['out'] = path.resolve(process.cwd(), args[i + 1]);
      break;
  }
});

if (exitCode >= 0) process.exit(exitCode);

const { out } = program;

process.stdin
  .pipe(parser((res) => {
    // generate the html report
    const output = generate(res);

    // Produce output either in a file or on stdout.
    if (out) {
      const outputPath = path.resolve(__dirname, out);
      fs.writeFileSync(outputPath, output);
    } else {
      process.stdout.write(output);
    }
  }))
  .pipe(process.stdout);
