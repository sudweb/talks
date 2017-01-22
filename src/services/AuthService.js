import {
    CLIENT_ID,
    SCOPES
} from '../config.json';

const gapi = window.gapi;

/**
* Check if current user has authorized this application.
*/
export const authorize = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': false,
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