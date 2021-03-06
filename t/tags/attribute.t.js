#!/usr/bin/env node

// Also tests the isolation of contexts.

require('./proof')(6, function (step, xstencil, _stencil, fixture, ok, compare) {

  step(function () {

    xstencil.generate('fixtures/attribute.xstencil', {}, step());
    _stencil.generate('fixtures/attribute.stencil', {}, step());
    fixture('fixtures/attribute.xml', step());

  }, function (xattribute, attribute, expected) {

    ok(compare(xattribute.document, expected), 'xstencil generate');

    step(function() {

      xstencil.regenerate(xattribute, {}, step());

    }, function (xattribute) {

      ok(compare(xattribute.document, expected), 'xstencil regenerate');
      xstencil.reconstitute(xattribute.document, step());

    }, function (xattribute) {

      xstencil.regenerate(xattribute, {}, step());

    }, function (xattribute) {

      ok(compare(xattribute.document, expected), 'xstencil reconstitute');

    });

    ok(compare(attribute.document, expected), 'stencil generate');

    step(function() {

      _stencil.regenerate(attribute, {}, step());

    }, function (attribute) {

      ok(compare(attribute.document, expected), 'stencil regenerate');
      _stencil.reconstitute(attribute.document, step());

    }, function (attribute) {

      _stencil.regenerate(attribute, {}, step());

    }, function (attribute) {

      ok(compare(attribute.document, expected), 'stencil reconstitute');

    });
  });
});
