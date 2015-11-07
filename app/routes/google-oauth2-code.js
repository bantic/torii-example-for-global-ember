import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  actions: {
    getGoogleAuthorizationCode() {
      let { controller } = this;
      controller.setProperties({
        authorizationCode: null,
        authError: null,
        accessTokenData: null
      });
    }
  }
});
