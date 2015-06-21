import Ember from 'ember';
import TravisCache from 'ember-travis-status/utils/travis-cache';
import getTravisStatus from 'ember-travis-status/utils/get-travis-status';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance | get travis status', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Basic call to getTravisStatus', function(assert) {
  let status;

  assert.expect(1);

  visit('/');

  andThen(function() {
    const repo = 'sir-dunxalot/ember-modals';

    getTravisStatus(repo).then(function(buildStatus) {
      status = buildStatus;
    });

    Ember.Test.registerWaiter(function() {
      return !!status;
    });
  });

  andThen(function() {

    assert.equal(Ember.typeOf(status), 'string',
      "Status returned should be some kind of string");

  });
});

test('Call for non-existent repo', function(assert) {
  let status;

  assert.expect(1);

  visit('/');

  andThen(function() {
    const repo = 'sir-dunxalot/some-fake-repo';

    getTravisStatus(repo).then(function(buildStatus) {
      status = buildStatus;
    });

    Ember.Test.registerWaiter(function() {
      return !!status;
    });
  });

  andThen(function() {

    assert.equal(status, 'no build available',
      'Status returned for fake repo should be "no build available"');

  });
});

test('Calls to the Travis cache', function(assert) {
  const fakeCachedValue = 'never-passing-ever';
  const repo = 'sir-dunxalot/ember-modals';

  let status;

  assert.expect(1);

  visit('/');

  andThen(function() {

    /* Pretend the value has been previously retrieved using
    some unusual value */

    TravisCache.set(repo, fakeCachedValue);

    getTravisStatus(repo).then(function(buildStatus) {
      status = buildStatus;
    });

    Ember.Test.registerWaiter(function() {
      return !!status;
    });
  });

  andThen(function() {

    /* Then check that the cached value, not
    a real Travis API response, is retrieved */

    assert.equal(status, fakeCachedValue,
      'Status returned should be retrieved from the cache');

  });
});
