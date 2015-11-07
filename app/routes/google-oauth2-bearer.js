import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    getGoogleAccessToken() {
      let { controller } = this;
      controller.setProperties({
        accessToken: null,
        authError: null,
        userData: null
      });
    }
  }
});
