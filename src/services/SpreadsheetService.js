import slug from 'slug';
import {
    SPREADSHEET_ID
} from '../config.json';

const gapi = window.gapi;

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
const parseResponse = (talks, notes) => {
  let talksArray = [];
  let notesArray = [];
  for (let i = 0; i < talks.values.length; i++) {
    var row = talks.values[i];
    let talk = {};
    if (i !== 0) {
      talks.values[0].map((field, j) => {
          return talk[getPrettyColumnNames(field)] = row[j];
      });
      talksArray.push(talk);
    }    
  }
  return {
    talks: talksArray,
    notes: notesArray
  };
}

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
        gapi.client.sheets.spreadsheets.values.batchGet({
          spreadsheetId: SPREADSHEET_ID,
          ranges: [
            'Propositions',
            'Notes'
          ],
        }).then(response => {
          const talks = response.result.valueRanges[0];
          const notes = response.result.valueRanges[1];

          if (talks.values.length > 0) {
            resolve(parseResponse(talks, notes));
          } else {
            reject('No data found.');
          }
        }, response => reject(response.result.error));
      });
  });
}