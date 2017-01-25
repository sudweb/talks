import slug from 'slug';
import {batchGet} from '../services/GoogleAPI';

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
 * @param {object} talks
 * @returns
 * 
 * @memberOf SpreadsheetService
 */
const parseResponse = talks => {
  console.log(talks);
  let talksArray = [];
  for (let i = 0; i < talks.length; i++) {
    var row = talks[i];
    let talk = {};
    if (i !== 0) {
      talks[0].map((field, j) => {
          return talk[getPrettyColumnNames(field)] = row[j];
      });
      talksArray.push(talk);
    }    
  }
  console.log(talksArray)
  return talksArray;
}


export const getTalks = () => {

  return new Promise((resolve, reject) => {
    batchGet(['Propositions'])
    .then(response => {
      console.log(response)
      const talks = response.valueRanges[0].values;

      if (talks.length > 0) {
        resolve(parseResponse(talks));
      } else {
        reject('No data found.');
      }
    });
  });
}