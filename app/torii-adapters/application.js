import Ember from 'ember';
import config from '../config/environment';

let { run, $ } = Ember;

let storageKey = 'torii-user-session-id';

export default Ember.Object.extend({
  fetch() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let sessionId = localStorage.getItem(storageKey);

      if (!sessionId) {
        reject('Not logged in');
      } else {
        let userUrl = config.authenticationHost + '/users/' + sessionId;

        $.get(userUrl).done(userData => {
          run(null, resolve, userData);
        }).fail(err => {
          localStorage.removeItem(storageKey);
          run(null, reject, err);
        });
      }
    }).then(currentUser => {
      // currentUser property will be merged onto session property
      return {
        currentUser
      };
    });
  },

  // authData is the result of `provider.open()`
  open(authData) {
    let { authorizationCode } = authData;
    let url = config.authenticationHost + '/sign-in-with-authorization-code';

    return new Ember.RSVP.Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url,
        data: JSON.stringify({authorizationCode}),
        dataType: 'json',
        contentType: 'application/json'
      }).done(result => {
        run(null, resolve, result);
      }).fail(err => {
        run(null, reject, err);
      });
    }).then(userData => {
      // persist authentication state
      localStorage.setItem(storageKey, userData.id);

      // This will get merged onto the session's currentUser property
      return { currentUser: userData };
    });
  },

  close() {
    return new Ember.RSVP.Promise((resolve) => {
      localStorage.removeItem(storageKey);

      resolve();
    });
  }
});
