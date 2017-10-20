# tap-html

> 📊 an html tap reporter

[![Npm Version](https://img.shields.io/npm/v/tap-html.svg)](https://www.npmjs.com/package/tap-html)
[![Build Status](https://travis-ci.org/gabrielcsapo/tap-html.svg?branch=master)](https://travis-ci.org/gabrielcsapo/tap-html)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/tap-html.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/tap-html)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/tap-html/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/tap-html)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/tap-html/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/tap-html#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/tap-html.svg)]()
[![npm](https://img.shields.io/npm/dm/tap-html.svg)]()

## Installation

```
npm install tap-html --save-dev
```

## Usage

```
Usage: tap-html [options]


Options:

  -V, --version     output the version number
  -o, --out <file>  if instead of piping content you want it to be written to an html file locally please specify the relative path
  -h, --help        output usage information
```

> This will generate a tap-html.html file

```
tape test/**.js | tap-html --out ./tap-html.html
```
