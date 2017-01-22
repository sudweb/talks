import slug from 'slug';
const gapi = window.gapi;

/**
 * Load profile data
 * 
 * @returns
 * 
 * @memberOf SpreadsheetService
 */
export const loadPeopleApi = () => {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  return new Promise((resolve, reject) => {
    gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me',
    }).then(response => resolve(response.result));
  });
}