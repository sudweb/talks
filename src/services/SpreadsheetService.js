import slug from 'slug';
import {
    SPREADSHEET_ID
} from '../config.json';

const gapi = window.gapi;

/**
 * Load profile data
 * 
 * @returns
 * 
 * @memberOf SpreadsheetService
 */
export const loadSheetsApi = () => {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  return new Promise((resolve, reject) => {
    gapi.client.load(discoveryUrl)
      .then(() => {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Propositions',
        }).then(response => {
          const range = response.result;
          if (range.values.length > 0) {
            resolve(parseResponse(range));
          } else {
            reject('No data found.');
          }
        }, response => reject(response.result.error));
      });
  });
}

/**
 * Get parse column name
 * 
 * @param {string} str
 * @returns
 * 
 * @memberOf SpreadsheetService
 */
const getPrettyColumnNames = str => {
  return slug(str, {
    lower: true,
    replacement: '_'
  });
}

/**
 * Parse talks retuls list
 * 
 * @param {object} range
 * @returns
 * 
 * @memberOf SpreadsheetService
 */
const parseResponse = range => {
  let data = [];
  for (let i = 0; i < range.values.length; i++) {
    var row = range.values[i];
    let talk = {};
    if (i !== 0) {
      range.values[0].map((field, j) => {
          talk[getPrettyColumnNames(field)] = row[j];
      });
      data.push(talk);
    }    
  }
  return data;
}