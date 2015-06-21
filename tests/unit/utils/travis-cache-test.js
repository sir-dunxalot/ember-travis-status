import Ember from 'ember';
import TravisCache from 'ember-travis-status/utils/travis-cache';
import { module, test } from 'qunit';

module('Unit | Utility | travis cache', {
  needs: ['service:travis-cache'],
});

test('it works', function(assert) {

  assert.ok(TravisCache.isTravisCache,
    'The Travis cache should exist');

  assert.equal(Ember.typeOf(TravisCache), 'instance',
    'The Travis cache should be an instance');

});
