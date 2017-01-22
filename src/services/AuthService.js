import {
    CLIENT_ID,
    SCOPES
} from '../config.json';

const gapi = window.gapi;

/**
* Check if current user has authorized this application.
*/
export const authorize = immediate => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': immediate,
        'cookie_policy': 'single_host_origin'
      }, authResult => {
        if (authResult && !authResult.error) {
          resolve(authResult);
        } else {
          reject(authResult.error);
        }
      });
    }, 100);
  });
}

export const signout = () => {
  // var token = gapi.auth.getToken();
  // if (token) {
  //   var accessToken = gapi.auth.getToken().access_token;
  //   if (accessToken) {
  //     // console.log(accessToken)
  //     // make http get request towards: 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken
  //     // In angular you can do it like this:
  //     fetch({
  //       method: 'GET',
  //       url: 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken
  //     });
  //   }
  // }
  // gapi.auth.setToken(null);
  gapi.auth.signOut();
}