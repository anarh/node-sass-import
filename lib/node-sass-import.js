'use strict';

var path = require('path');
var resolve = require('resolve');
var glob = require('glob');
var pathParse = require('path-parse');
var pathFormat = require('path-format');

var opts = {
  exts: '.@(sa|c|sc)ss',
  pfx: '?(_)'
};

var resolver = function (url, baseDir, exts, done) {
  resolve(url, {
    basedir: baseDir,
    extensions: [ '.scss', '.sass', '.css' ]
  }, function (err, file) {
    if (err) throw err;

    console.log(file);
    done({ file: file });
  });
};

module.exports = function (url, file, done) {
  var baseDir = path.dirname(file);
  var fullPath = path.resolve(baseDir, url);
  var parsedPath = pathParse(fullPath);
  var exts = [ '.scss', '.css' ];
  var formattedPath;

  if (parsedPath.ext === '') {
    parsedPath.ext = opts.exts;
    parsedPath.base = opts.pfx + parsedPath.base + opts.exts;
    parsedPath.name = opts.pfx + parsedPath.name;
  }

  formattedPath = pathFormat(parsedPath);

  glob(formattedPath, function (err, urls) {
    if (err) throw err;

    if (urls.length === 0) {
      glob(fullPath, function (err, dirs) {
        if (err) throw err;

        if (dirs.length === 0) {
          resolver(url, baseDir, exts, done);
        }

        if (dirs.length === 1) {
          resolver(dirs[0], baseDir, exts, done);
        }
      });
    }

    if (urls.length === 1) {
      resolver(urls[0], baseDir, exts, done);
    }

    if (urls.length > 1) {
      console.log(urls);
      throw new Error('Resolve conflicting files');
    }
  });
};
