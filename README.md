# node-sass-import 

[![npm][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![js-standard-style][standard-image]][standard-url]

Allows usage of (@include "some-sass-npm-module") akin to require("some-module") in node.js

## Install

```sh
$ npm install --save node-sass-import
```

## Usage

Used in conjunction with node-sass. In a simple npm-only build setup, the example below in package.json should suffice.

```json
{
  "name": "your-package",
  "description": "fun package",
  "main": "index.js",
  "scripts": {
    "build-css": "node-sass test.scss dist/test.css --importer node_modules/node-sass-import/index.js"
  }
}

```
You can now build your scss files as follows

```sh
$ npm run build-css
```

## API

Coming soon...

## License

2016 MIT © [Emmanuel (Manny) Narh]()

[travis-image]: https://travis-ci.org/anarh/node-sass-import.svg?branch=master
[travis-url]: https://travis-ci.org/anarh/node-sass-import
[npm-image]: https://img.shields.io/npm/v/node-sass-import.svg?style=flat
[npm-url]: https://npmjs.org/package/node-sass-import
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: http://standardjs.com/
[coveralls-image]: https://coveralls.io/repos/anarh/node-sass-import/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/r/anarh/node-sass-import
