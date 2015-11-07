# Torii-example-for-global-ember

An example app to demonstrate torii.

## Set up

### Set up a google project for implicit grant flow

Create a google application.

  * Visit https://console.developers.google.com/project
  * Create a new project
  * Click "Use Google APIs" to enable/disable APIs
  * Ensure "Google+ API" is enabled
  * Click the "Credentials" link in the side panel
  * Configure OAuth consent screen
  * Add an "OAuth 2.0 client ID" credential
    * Choose "Web application" credential
    * Enter required information, use 'http://localhost:4200/' for authorized redirect URI
  * Copy your `client_id` (can ignore the `client_secret` for now)
  * In `config/environment.js` set the `apiKey` property to your copied `client_id` for the 'google-oauth2-bearer' provider

Optionally change scopes by setting the 'scopes' parameter to 'profile' or 'email' in your configuration. [List of Google OAuth login scopes](https://developers.google.com/+/web/api/rest/oauth#login-scopes). The default scope for the google-oauth2-bearer is [email](https://github.com/Vestorly/torii/blob/462adfe4d0e06d28af9eebc0e1d9aa757635221f/lib/torii/providers/google-oauth2-bearer.js#L21) if none is explicitly configured.

### Set up google project for authorization code grant flow

First, follow the steps as above for the implicit grant flow.

If it is not already present add a configuration section in `config/environment.js` for
a torii provider called 'google-oauth2'. Use the same `apiKey` and `redirectUri` values
as for the `google-oauth2-bearer` provider.

[Authorization Code Grant flow](http://tools.ietf.org/html/rfc6749#section-4.1) requires a server-side component.

There is a simple server running at heroku that can exchange an authorization code. The configuration already points
at this endpoint to handle the server-side exchange for the access token.
Demo server code is at: https://github.com/bantic/torii-example-for-global-ember-backend

### Set up social sign in with google

Follow the steps above for the authorization code grant flow.

Ensure the torii configuration specifies a `sessionServiceName` property of 'session'. This is necessary to opt-in to Torii's session management.
Notice that a torii-adapter called 'application' has been created.

When signing in with google, the torii session service will:
  * `open` the torii built-in 'google-oauth2' provider, resulting in an authorization code
  * torii's session will attempt to find a 'google-oauth2' adapter, and fall back to using the 'application' adapter
  * the authorization code from the provider will be passed to the `open` method of the 'application' adapter
  * the 'application' adapter, which we have written for this application, will:
    * POST the authorization code to our own backend
    * our backend will exchange this code for an access token and then use the token to retrieve the user's email
    * our backend will log in the user by email, or create a new user for this email if none exists
    * our backend responds with a session id for this user
  * the adapter receives the session id and stores it in local storage
  * the adapter returns a promise that resolves with a `{currentUser}` object
  * the torii session service merges that `currentUser` property and transitions the session to its authenticate state
