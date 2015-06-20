import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('make-first-request');
  this.route('make-second-request');
});

export default Router;
