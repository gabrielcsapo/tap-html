#!/usr/bin/env node

const parser = require('../');

process.stdin
  .pipe(parser())
  .pipe(process.stdout);
