import Ember from 'ember';
import getTravisStatus from 'ember-travis-status/utils/get-travis-status';
import layout from '../templates/components/travis-status';

export default Ember.Component.extend({
  className: 'travis-status',
  classNameBindings: ['className', 'statusClassName'],
  isFailing: Ember.computed.equal('status', 'failing'),
  isPassing: Ember.computed.equal('status', 'passing'),
  layout: layout,
  repo: null,
  status: null,
  tagName: 'dl',

  statusClassName: Ember.computed('className', 'status', function() {
    const dasherizedStatus = Ember.String.dasherize(this.get('status'));

    return `${this.get('className')}-${dasherizedStatus}`;
  }),

  getStatus: Ember.on('init', function() {
    getTravisStatus(this.get('repo')).then((status) => {
      if (!this.get('isDestroying')) {
        this.set('status', status);
      }
    });
  })
});
