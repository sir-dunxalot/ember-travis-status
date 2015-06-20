import Ember from 'ember';
import getTravisStatus from 'ember-travis-status/utils/get-travis-status';
import layout from '../templates/components/travis-status';

export default Ember.Component.extend({
  failing: Ember.computed.equal('status', 'failing'),
  layout: layout,
  repo: null,
  status: null,
  passing: Ember.computed.equal('status', 'passing'),

  getStatus: Ember.on('init', function() {
    getTravisStatus(this.get('repo')).then(function(status) {
      this.set('status', status);
    }.bind(this));
  }),
});
