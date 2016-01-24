'use strict';

var nodeSassImport = require('../');
var test = require('tape');

test('base:function:test', function (t) {
  t.ok(typeof nodeSassImport === 'function');
  t.end();
});
