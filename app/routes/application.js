import Ember from 'ember';

export default Ember.Route.extend({
  /*
  beforeModel() {
    return this.get('session').fetch('google-oauth2').then(() => {
      // no-op, we are logged in
    }).catch(() => {
      // no-op, it is ok if we are not logged in
    });
  },
  */

  actions: {
    accessDenied() {
      this.transitionTo('google-sign-in');
    }
  }
});
