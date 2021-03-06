#!/usr/bin/env node

var fs = require('fs');
require('./proof')(8, function (step, xstencil, _stencil, fixture, ok, compare) {

  step(function () {

    xstencil.generate('fixtures/conditional.xstencil', { greeting: "Hello, World!" }, step());
    _stencil.generate('fixtures/conditional.stencil', { greeting: "Hello, World!" }, step());
    fixture('fixtures/conditional-true.xml', step());
    fixture('fixtures/conditional-false.xml', step());

  }, function (xconditional, conditional, truthy, falsey) {

    ok(compare(xconditional.document, truthy), 'xstencil true');

    step(function () {

      xstencil.regenerate(xconditional, {}, step());

    }, function (xconditional) {

      ok(compare(xconditional.document, falsey), 'xstencil false');
      xstencil.regenerate(xconditional, { greeting: "Hello, World!" }, step());

    }, function (xconditional) {

      ok(compare(xconditional.document, truthy), 'xstencil regenerating');
      xstencil.reconstitute(xconditional.document, step());

    }, function (xconditional) {

      xstencil.regenerate(xconditional, { greeting: "Hello, World!" }, step());

    }, function (xconditional) {

      ok(compare(xconditional.document, truthy), 'xstencil regenerating');

    });

    ok(compare(conditional.document, truthy), 'stencil true');

    step(function () {

      _stencil.regenerate(conditional, {}, step());

    }, function (conditional) {

      ok(compare(conditional.document, falsey), 'stencil false');
      _stencil.regenerate(conditional, { greeting: "Hello, World!" }, step());

    }, function (conditional) {

      ok(compare(conditional.document, truthy), 'stencil regenerating');
      _stencil.reconstitute(conditional.document, step());

    }, function (conditional) {

      _stencil.regenerate(conditional, { greeting: "Hello, World!" }, step());

    }, function (conditional) {

      ok(compare(conditional.document, truthy), 'stencil regenerating');

    });
  });
});
