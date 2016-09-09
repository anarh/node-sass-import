# node-sass-import 

[![npm][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![js-standard-style][standard-image]][standard-url]

Allows usage of `@import "some-sass-npm-module"` akin to `require("some-npm-module")` in node.js

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
    "build-css": "node-sass test.scss dist/test.css --importer node_modules/node-sass-import"
  }
}

```
You can now build your scss files as follows

```sh
$ npm run build-css
```

## Example

@import in sass can now be used just like a require statement. The example below imports the main scss file from the newsapps-syles npm module. At build time, all @import statements will be resolved locally or like npm modules. Also includes support for partial (e.g. _partial.scss).

```scss
@import "newsapps-styles";

.some-style {
  color: $primary-blue;
}
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
