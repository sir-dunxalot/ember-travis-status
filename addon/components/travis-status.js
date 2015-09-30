import Ember from 'ember';
import getTravisStatus from 'ember-travis-status/utils/get-travis-status';
import layout from '../templates/components/travis-status';

const { computed, on } = Ember;

export default Ember.Component.extend({
  className: 'travis-status',
  classNameBindings: ['className', 'statusClassName'],
  isFailing: computed.equal('status', 'failing'),
  isPassing: computed.equal('status', 'passing'),
  layout: layout,
  repo: null,
  status: null,
  tagName: 'dl',

  statusClassName: computed('className', 'status', function() {
    const dasherizedStatus = Ember.String.dasherize(this.get('status'));

    return `${this.get('className')}-${dasherizedStatus}`;
  }),

  getStatus: on('init', function() {
    getTravisStatus(this.get('repo')).then((status) => {
      if (!this.get('isDestroying')) {
        this.set('status', status);
      }
    });
  })
});
