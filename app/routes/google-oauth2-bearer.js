import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    getGoogleAccessToken() {
      let { controller } = this;
      controller.setProperties({
        accessToken: null,
        error: null,
        userData: null
      });

      this.get('torii').open('google-oauth2-bearer').then(authData => {
        let { authorizationToken: { access_token: accessToken } } = authData;

        controller.set('accessToken', accessToken);
      }).catch(err => {
        controller.set('authError', err);
      });
    },

    getUserData(accessToken) {
      let { controller } = this;
      let baseUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
      let url = `${baseUrl}?access_token=${accessToken}`;

      Ember.$.get(url).done(result => {
        let str = JSON.stringify(result);
        Ember.run(controller, 'set', 'userData', str);
      });
    }
  }
});
