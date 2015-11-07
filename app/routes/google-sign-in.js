import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signIn() {
      let { controller } = this;
      let session = this.get('session');

      controller.set('error', null);

      session.open('google-oauth2').then(() => {
        // no-op, we are signed in
        if (session.attemptedTransition) {
          session.attemptedTransition.retry();
          session.attemptedTransition = null;
        }
      }).catch(err => {
        Ember.run(controller, 'set', 'error', err);
      });
    },

    signOut() {
      this.get('session').close('google-oauth2');
    }
  }
});
