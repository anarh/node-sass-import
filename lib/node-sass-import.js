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

var buildSassGlob = function (path) {
  var parsedPath = pathParse(path);
  if (parsedPath.ext === '' || opts.exts !== parsedPath.ext) {
    parsedPath.ext = opts.exts;
    parsedPath.base = opts.pfx + parsedPath.base + opts.exts;
    parsedPath.name = opts.pfx + parsedPath.name;
  }

  return pathFormat(parsedPath);
};

var resolver = function (url, baseDir, done) {
  resolve(url, {
    basedir: baseDir,
    extensions: [ '.scss', '.sass', '.css' ],
    pathFilter: function (pkg, absPath, relativePath) {
      var globbedPath = buildSassGlob(absPath);
      var paths = glob.sync(globbedPath);
      var resolvedPath = paths && paths[0];
      if (resolvedPath) {
        return path.join(path.dirname(relativePath), path.basename(resolvedPath));
      }
    }
  }, function (err, file) {
    if (err) throw err;

    console.log(file);
    done({ file: file });
  });
};

module.exports = function (url, file, done) {
  var baseDir = path.dirname(file);
  var fullPath = path.resolve(baseDir, url);
  var formattedPath = buildSassGlob(fullPath);

  glob(formattedPath, function (err, urls) {
    if (err) throw err;

    if (urls.length === 0) {
      glob(fullPath, function (err, dirs) {
        if (err) throw err;

        if (dirs.length === 0) {
          resolver(url, baseDir, done);
        }

        if (dirs.length === 1) {
          resolver(dirs[0], baseDir, done);
        }
      });
    }

    if (urls.length === 1) {
      resolver(urls[0], baseDir, done);
    }

    if (urls.length > 1) {
      console.log(urls);
      throw new Error('Resolve conflicting files');
    }
  });
};
