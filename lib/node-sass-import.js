'use strict';

var path = require('path');
var resolve = require('resolve');
var glob = require('glob');

var resolver = function(url, baseDir, exts, done){
  resolve(url, {
    basedir: baseDir,
    extensions: [ '.scss', '.css' ]
  }, function(err, res){
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
    done({ file: res });
  });
};

module.exports = function (url, file, done) {
  var baseDir = path.dirname(file),
      fullPath = path.resolve(baseDir, url),
      parsedPath = path.parse(fullPath),
      exts = [ '.scss', '.css' ],
      formattedPath;

  if (parsedPath.ext === ''){
    parsedPath.ext = '.@(sa|c|sc)ss';
    parsedPath.base = '?(_)' + parsedPath.base + '.@(sa|c|sc)ss';
    parsedPath.name = '?(_)' + parsedPath.name;
  }

  formattedPath = path.format(parsedPath);

  glob(formattedPath, function (err, urls) {
    if (urls.length === 0){
      glob(fullPath, function(err, dirs){
        if (dirs.length === 0){
          resolver(url, baseDir, exts, done);
        }

        if (dirs.length === 1) {
          resolver(dirs[0], baseDir, exts, done);
        }
      });
    }

    if (urls.length === 1){
      resolver(urls[0], baseDir, exts, done);
    }

    if (urls.length > 1) {
      console.log(urls);
      throw { msg: 'Resolve conflicting files' };
    }
  });
};