const gapi = window.gapi;

const parseResponse = result => {
  console.log(result)
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

/**
 * Load profile data
 * 
 * @returns
 * 
 * @memberOf SpreadsheetService
 */
export const loadPeopleApi = () => {
  return new Promise((resolve, reject) => {
    gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me',
    }).then(response => {
      resolve(parseResponse(response.result))
    });
  });
}
