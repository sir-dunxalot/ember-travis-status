import Ember from 'ember';
import layout from '../templates/components/travis-badge';

const { computed } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['url:data', 'type'],
  branch: null,
  classNames: ['travis-badge'],
  layout: layout,
  repo: null,
  tagName: 'object',
  type: 'image/svg+xml',

  url: computed('branch', 'repo', function() {
    const branch = this.get('branch');
    const repo = this.get('repo');

    let url = `https://travis-ci.org/${repo}.svg`;

    if (branch) {
      return `${url}?branch=${branch}`;
    }

    return url;
  })
});
