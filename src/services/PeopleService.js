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
    }).then(response => resolve(parseResponse(response.result)));
  });
}

const parseResponse = result => {
  let profile = {};
  if (result.names) {
    profile.name = result.names[0].displayName;
  }

  if (result.emailAddresses) {
    profile.email = result.emailAddresses[0].value;
  }

  if (result.photos) {
    profile.img = result.photos[0].url;

  }

  return profile;
}