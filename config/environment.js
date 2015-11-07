/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'torii-example-for-global-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    // If you are running the example backend app (https://github.com/bantic/torii-example-for-global-ember-backend)
    // locally, this can be uncommented:
    //authorizationExchangeServerUrl: 'http://localhost:5000/exchange-authorization-code',

    authorizationExchangeServerUrl: 'https://torii-example-backend.herokuapp.com/exchange-authorization-code',

    torii: {
      providers: {
        'google-oauth2-bearer': {
          apiKey: '777290297768-o0v0187l099c9ngv9f26q5bneg1uk10q.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200/',
          scope: 'email'
        },
        'google-oauth2': {
          apiKey: '777290297768-o0v0187l099c9ngv9f26q5bneg1uk10q.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200/',

          // If accessType: 'offline' is granted, the authorization code exchange
          // process will yield a refresh_token in addition to an access_token
           accessType: 'offline',

          // approvalPrompt: 'force' // default value: 'auto'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
