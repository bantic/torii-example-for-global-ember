import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  actions: {
    getGoogleAuthorizationCode() {
      let { controller } = this;
      controller.setProperties({
        authorizationCode: null,
        error: null,
        accessTokenData: null
      });

      this.get('torii').open('google-oauth2').then(authData => {
        let { authorizationCode } = authData;

        controller.set('authorizationCode', authorizationCode);
      }).catch(err => {
        controller.set('authError', err);
      });
    },

    getAccessToken(authorizationCode) {
      let { controller } = this;

      let url = config.authorizationExchangeServerUrl;
      Ember.$.ajax({
        type: 'post',
        url,
        data: JSON.stringify({authorizationCode}),
        dataType: 'json',
        contentType: 'application/json'
      }).done(result => {
        Ember.run(controller, 'set', 'accessTokenData', JSON.stringify(result));
      });
    }
  }
});
