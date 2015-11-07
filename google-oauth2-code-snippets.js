// configuration:
  authorizationExchangeServerUrl: 'https://torii-example-backend.herokuapp.com/exchange-authorization-code',

  'google-oauth2': {
    apiKey: '777290297768-o0v0187l099c9ngv9f26q5bneg1uk10q.apps.googleusercontent.com',
    redirectUri: 'http://localhost:4200/',

    // If accessType: 'offline' is granted, the authorization code exchange
    // process will yield a refresh_token in addition to an access_token
     accessType: 'offline',

    // approvalPrompt: 'force' // default value: 'auto'
  }

// route actions
    getGoogleAuthorizationCode() {
      let { controller } = this;
      controller.setProperties({
        authorizationCode: null,
        authError: null,
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
