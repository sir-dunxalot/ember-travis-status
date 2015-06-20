import Ember from 'ember';
import getTravisStatus from 'ember-travis-status/utils/get-travis-status';
import layout from '../templates/components/travis-status';

export default Ember.Component.extend({
  className: 'travis-status',
  classNameBindings: ['className', 'statusClassName'],
  failing: Ember.computed.equal('status', 'failing'),
  layout: layout,
  passing: Ember.computed.equal('status', 'passing'),
  repo: null,
  status: null,
  tagName: 'dl',

  statusClassName: Ember.computed('className', 'status', function() {
    return this.get('className') + '-' + this.get('status');
  }),

  getStatus: Ember.on('init', function() {
    getTravisStatus(this.get('repo')).then(function(status) {
      this.set('status', status);
    }.bind(this));
  }),
});
