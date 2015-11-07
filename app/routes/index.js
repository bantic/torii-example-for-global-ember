import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authorizeProvider(providerName) {
      let controller = this.controller;
      controller.setProperties({
        authData: null,
        authError: null
      });

      this.get('torii').open(providerName).then(authData => {
        controller.set('authData', JSON.stringify(authData));
      }).catch(err => {
        controller.set('authError', err);
      });
    }
  }
});
