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
