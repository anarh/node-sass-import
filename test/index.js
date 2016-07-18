'use strict';

var nodeSassImport = require('../');
var test = require('tape');
var sass = require('node-sass');

test('base:function:test', function (t) {
  t.ok(typeof nodeSassImport === 'function');
  t.end();
});

test('base:importer:test', function(t) {
  sass.render({
    file: 'test/test.scss',
    importer: nodeSassImport
  }, function(err, result) {
    t.error(err);
    t.end();
  });
});
