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

test('Calls to the Travis cache', function(assert) {
  // const TravisCache = application.registry.lookup('service:travis-cache');
  const fakeCachedValue = 'never-passing';
  const repo = 'sir-dunxalot/ember-modals';

  let status;

  assert.expect(1);

  visit('/');

  andThen(function() {

    TravisCache.set(repo, fakeCachedValue);

    getTravisStatus(repo).then(function(buildStatus) {
      status = buildStatus;
    });

    Ember.Test.registerWaiter(function() {
      return !!status;
    });
  });

  andThen(function() {

    assert.equal(status, fakeCachedValue,
      "Status returned should be retrieved from the cache");

  });
});
