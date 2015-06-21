import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:travis-cache', 'Unit | Service | travis cache', {

  beforeEach: function() {
    service = this.subject();
  },

});


test('it exists', function(assert) {

  assert.ok(service.get('isTravisCache'),
    'The service should exist for the Travis cache');

});
