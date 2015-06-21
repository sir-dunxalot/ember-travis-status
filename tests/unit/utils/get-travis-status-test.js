import getTravisStatus from 'ember-travis-status/utils/get-travis-status';
import { module, test } from 'qunit';

module('Unit | Utility | get travis status', {
  needs: ['service:travis-cache'],
});

test('it works', function(assert) {
  const result = getTravisStatus();

  assert.ok(!!result.then,
    'The helper should return a promise');

});
