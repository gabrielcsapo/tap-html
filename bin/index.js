#!/usr/bin/env node

const program = require('commander');
const path = require('path');

const parser = require('../');
const generate = require('../lib/generate');

program
  .version(require('../package').version)
  .option('-o, --out <file>', 'if instead of piping content you want it to be written to an html file locally please specify the relative path')
  .parse(process.argv);

process.stdin
  .pipe(parser((res) => {
    // generate the html report
    if(program.out) {
      // write the output to the specified location
      generate(res, path.resolve(process.cwd(), program.out));
    } else {
      generate(res);
    }
  }))
  .pipe(process.stdout);
