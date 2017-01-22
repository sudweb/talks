import slug from 'slug';
const gapi = window.gapi;

const CLIENT_ID = '460329070283-8j9kmv5hucpqh2qv2aeirupk7ddg31si.apps.googleusercontent.com';
const SPREADSHEET_ID = '1I8mJSe6PgrUBmpGHCqtDWcxsSfLWPN11Ezi14bmJ1Iw';
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

class SpreadsheetService {
    /**
   * Check if current user has authorized this application.
   */
  authorize() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        gapi.auth.authorize({
          'client_id': CLIENT_ID,
          'scope': SCOPES,
          'immediate': false
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

  /**
   * Load Sheets API client library.
   */
  loadSheetsApi() {
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
              resolve(this.parseResponse(range));
            } else {
              reject('No data found.');
            }
          }, function(response) {
            reject('Error: ' + response.result.error.message);
          });
        });
    });
  }

  getPrettyColumnNames(str) {
    return slug(str, {
      lower: true,
      replacement: '_'
    });
  }

  parseResponse(range) {
    let data = [];
    for (let i = 0; i < range.values.length; i++) {
      var row = range.values[i];
      let talk = {};
      range.values[0].map((field, j) => {
        talk[this.getPrettyColumnNames(field)] = row[j];
      });
      
      data.push(talk);
    }
    console.log(data);
    return data;
  }
};

export default new SpreadsheetService();