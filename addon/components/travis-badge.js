import Ember from 'ember';
import layout from '../templates/components/travis-badge';

export default Ember.Component.extend({
  attributeBindings: ['url:data', 'type'],
  branch: null,
  classNames: ['travis-badge'],
  layout: layout,
  repo: null,
  tagName: 'object',
  type: 'image/svg+xml',

  url: Ember.computed('branch', 'repo', function() {
    const branch = this.get('branch');
    const repo = this.get('repo');

    let url = `https://travis-ci.org/${repo}.svg`

    if (branch) {
      url += `?${branch}`;
    }

    return url;
  }),

});

//
