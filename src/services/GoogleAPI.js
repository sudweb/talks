import {
    SPREADSHEET_ID
} from '../config.json';

const gapi = window.gapi;

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
          console.log(response)
          // const talks = response.result.valueRanges[0];
          // const notes = response.result.valueRanges[1];
          resolve(response.result);

          // if (talks.values.length > 0) {
          // } else {
          //   reject('No data found.');
          // }
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