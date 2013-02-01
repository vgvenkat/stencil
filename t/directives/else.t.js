#!/usr/bin/env node

var context, fs = require('fs');
require('./proof')(5, function (async) {
  async(function (stencil, resolver) {
    context = stencil.create(__dirname + '/', resolver.create());
    context.generate('fixtures/else.stencil', { value: true }, async());
  },
  
  function (actual, fixture) {
    fixture('fixtures/else-true.xml', async());
  },
  
  function (truthy, actual, ok, compare) {
    ok(compare(actual.document, truthy), 'generate');
    context.reconstitute(actual.document, async());
  },
  
  function (actual) {
    context.regenerate(actual, { value: true }, async());
  },

  function (actual, truthy, compare, ok) {
    ok(compare(actual.document, truthy), 'reconstitute');
    context.regenerate(actual, { value: false }, async());
  },

  function (actual, fixture) {
    fixture('fixtures/else-false.xml', async());
  },

  function (falsey, actual, ok, compare) {
    ok(compare(actual.document, falsey), 'false');
    context.regenerate(actual, { value: true }, async());
  },
  
  function (actual, truthy, ok, compare) {
    ok(compare(actual.document, truthy), 'true-scavenge');
    context.regenerate(actual, { value: false }, async());
  },

  function (actual, falsey, ok, compare) {
    ok(compare(actual.document, falsey), 'false-after-scavenge');
  });
});