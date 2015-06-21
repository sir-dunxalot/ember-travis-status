import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

let component;

function set(keyValuePairs) {
  Ember.run(component, function() {
    component.setProperties(keyValuePairs);
  });
}

moduleForComponent('travis-badge', 'Unit | Component | travis badge', {
  unit: true,

  beforeEach: function() {
    component = this.subject();
  },
});

test('it can build the correct URL', function(assert) {
  const branch = 'master';
  const repo = 'sir-dunxalot/ember-modals';

  let $element, fullUrl;

  assert.expect(7);

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  set({ repo });

  assert.equal(component.get('url'), `https://travis-ci.org/${repo}.svg`,
    'The URL should include the new repo');

  assert.ok(component.get('type').indexOf('svg') > -1,
    'The type property should reflect that the object is an SVG');

  set({ branch });

  fullUrl = `https://travis-ci.org/${repo}.svg?branch=${branch}`;

  assert.equal(component.get('url'), fullUrl,
    'The URL should include the new branch param');

  $element = this.$(); // Calls render

  assert.equal(component._state, 'inDOM',
    'The component should be inserted into the DOM');

  assert.equal($element.attr('data'), fullUrl,
    'The updated URL should be bound to the data attribute');

  assert.ok($element.attr('type').indexOf('svg') > -1,
    'The type attribute should reflect that the object is an SVG');

});
