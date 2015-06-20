import getTravisStatus from '../../../utils/get-travis-status';
import { module, test } from 'qunit';

module('Unit | Utility | get travis status');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = getTravisStatus();
  assert.ok(result);
});
