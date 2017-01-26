import {
    CLIENT_ID,
    SCOPES,
    SPREADSHEET_ID
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
    }, 1000);
  });
}

export const signOut = () => {
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

/**
 * Load profile data
 *  Should return an array contains :
 *  - [0] : an Array of all talks
 *  - [1] : an Object contains all members name who already vote once
 * @param {array} range
 * @returns
 * 
 * @memberOf GoogleAPI
 */
export const batchGet = ranges => {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  return new Promise((resolve, reject) => {
    gapi.client.load(discoveryUrl)
      .then(() => {
        gapi.client.sheets.spreadsheets.values.batchGet({
          spreadsheetId: SPREADSHEET_ID,
          ranges: ranges,
        }).then(response => {
          resolve(response.result);
        }, response => reject(response.result.error));
      });
  });
}

export const append = () => {
  const values = ['test'];

  const body = {
    'values': values
  }
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Notes',
    valueInputOption: 'RAW',
    body: body
  }).then((response) => {
    console.log(response)
  })
}


/**
 * Load profile data
 * 
 * @returns
 * 
 * @memberOf GoogleAPI
 */
export const requestPeople = () => {
  return gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me',
    });
}