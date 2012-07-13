#!/usr/bin/env node

require("./proof")(1, function (async) {
  var context, fs = require("fs");

  async(function (stencil, resolver) {

    context = stencil.create(__dirname + '/', resolver.create());
    context.generate("fixtures/each.stencil", async());

  }, function (actual, fixture) {

    fixture("fixtures/each.xml", async());

  }, function (expected, actual, ok, compare) {

    ok(compare(actual, expected), "called");

  });
});