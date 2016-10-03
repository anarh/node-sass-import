'use strict';

var nodeSassImport = require('../');
var test = require('tape');
var sass = require('node-sass');

test('base:function:test', function (t) {
  t.ok(typeof nodeSassImport === 'function');
  t.end();
});

test('base:importer:test', function (t) {
  sass.render({
    file: 'test/fixtures/main.scss',
    importer: nodeSassImport
  }, function (err, result) {
    t.error(err, 'should render SASS without errors');
    t.end();
  });
});

test('base:importer:globs:test', function (t) {
  sass.render({
    file: 'test/fixtures/glob.scss',
    importer: nodeSassImport
  }, function (err, result) {
    var css = result.css.toString();
    t.error(err, 'should render SASS without errors');
    t.ok(/div\.one/.test(css), 'renders one.scss');
    t.ok(/div\.two/.test(css), 'renders two.scss');
    t.end();
  });
});
