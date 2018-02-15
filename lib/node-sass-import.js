'use strict';

var path = require('path');
var resolve = require('resolve');
var glob = require('glob');
var pathParse = require('path-parse');
var pathFormat = require('path-format');
var async = require('async');

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

/**
 * Resolves `url` and calls `done(error, null)` when done.
 * Note that the `done()` function args don't match what node-sass expects.
 */

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
    if (err) return done(err);

    // Strip the extension so .css gets evaluated properly as .scss
    file = file.replace(/\.(js|(sa|sc|c)ss)$/, '');
    done(null, file);
  });
};

/**
 * Builds `{file}` or `{contents}` (as node-sass expects) from a list of files.
 */

var importify = function (files) {
  if (files.length === 1) {
    return { file: files[0] };
  } else {
    var contents = files.map(function (fname) {
      return '@import ' + JSON.stringify(fname) + ';';
    }).join('\n');

    return { contents: contents };
  }
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
          resolver(url, baseDir, function (err, results) {
            if (err) throw err;
            done(importify([results]));
          });
        }

        if (dirs.length === 1) {
          resolver(dirs[0], baseDir, function (err, results) {
            if (err) throw err;
            done(importify([results]));
          });
        }
      });
    }

    if (urls.length === 0) return;

    // Resolve all of `urls` through resolver(); then compile them into
    // '@import' statements.
    async.parallel(urls.map(function (url) {
      return function (callback) {
        resolver(url, baseDir, callback);
      };
    }), function (err, filenames) {
      if (err) throw err;
      done(importify(filenames));
    });
  });
};
