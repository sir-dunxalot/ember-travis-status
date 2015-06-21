import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

let component;

function set(keyValuePairs) {
  Ember.run(component, function() {
    component.setProperties(keyValuePairs);
  });
}

moduleForComponent('travis-status', 'Unit | Component | travis status', {
  unit: true,

  beforeEach: function() {
    component = this.subject();
  },
});

test('the property bindings are correct', function(assert) {
  // let className = component.get('className');
  let status = 'passing';

  // assert.expect(8);

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  // set({ status });

  // assert.equal(component.get('statusClassName'), `${className}-${status}`,
  //   'The status class name should reflect the new status');

  // assert.ok(!component.get('isFailing'),
  //   "isFailing should be false when the returned status is 'passing'");

  // assert.ok(component.get('isPassing'),
  //   "isPassing should be true when the returned status is 'passing'");

  // className = 'travis-widget';
  // status = 'failing';

  // set({
  //   className,
  //   status
  // });

  // assert.equal(component.get('statusClassName'), `${className}-${status}`,
  //   'The status class name should reflect the new class name and status');

  // assert.ok(component.get('isFailing'),
  //   "isFailing should be true when the returned status is 'failing'");

  // assert.ok(!component.get('isPassing'),
  //   "isPassing should be false when the returned status is 'failing'");

  // this.render();

  // assert.equal(component._state, 'inDOM',
  //   'The component should be inserted into the DOM');

});
