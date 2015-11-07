import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('google-oauth2-bearer');
  this.route('google-oauth2-code');
});

export default Router;
