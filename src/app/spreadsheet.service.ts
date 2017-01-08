import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Talks } from './talks';
import { Entries } from './entries';

//   // getUrlArgument(key) {
//   //   var value = '';
//   //   location.search.replace(new RegExp(key + '=([^&$]+)'), function (m, matched_value) {
//   //     value = matched_value;
//   //   });

//   //   return value;
//   // };
const id = '1I8mJSe6PgrUBmpGHCqtDWcxsSfLWPN11Ezi14bmJ1Iw';

@Injectable()
export class SpreadsheetService {
  sheetsToLoad: number;
  endpoint: string = 'https://spreadsheets.google.com';
  key: string = '1I8mJSe6PgrUBmpGHCqtDWcxsSfLWPN11Ezi14bmJ1Iw';
  baseJsonPath: string;
  columnNames: string[] = [];
  elements: Object[] = [];
  toLoad: string[] = [];
  foundSheetNames: string[] = [];
  raw: Object;
  prettyColumns: Object;

  constructor(
    private http: Http
  ) {}

  getTalks(): Promise<Talks[]> {
    this.baseJsonPath = '/feeds/worksheets/' + this.key + '/public/basic?alt=json';

    return this.loadSheets()
      .then(response => response as Talks[])
      .catch(this.handleError);
  }

  getEntries(): Promise<Entries[]> {
    this.baseJsonPath = '/feeds/worksheets/' + this.key + '/public/basic?alt=json';
    return this.fetchPrettyColumns()
      .then(response => response as Entries[])
      .catch(this.handleError);
  }

  private requestData(path): Promise<any> {
    return this.http.get(this.endpoint + path)
      .toPromise()
  }



  /*
    Load all worksheets of the spreadsheet, turning each into a Tabletop Model.
    Need to use injectScript because the worksheet view that you're working from
    doesn't actually include the data. The list-based feed (/feeds/list/key..) does, though.
    Calls back to loadSheet in order to get the real work done.

    Used as a callback for the worksheet-based JSON
  */
  private loadSheets(): Promise<any> {
    this.baseJsonPath = '/feeds/worksheets/' + this.key + '/public/basic?alt=json';

    return this.requestData(this.baseJsonPath)
      .then(response => {
        const data = response.json();
        for (let i = 0, ilen = data.feed.entry.length; i < ilen ; i++) {
          this.foundSheetNames.push(data.feed.entry[i].title.$t);
          var linkIdx = data.feed.entry[i].link.length-1;
          var sheetId = data.feed.entry[i].link[linkIdx].href.split('/').pop();
          var jsonPath = '/feeds/list/' + this.key + '/' + sheetId + '/public/values?alt=json';

          this.toLoad.push(jsonPath);
        }

        this.sheetsToLoad = this.toLoad.length;

        for(let i = 0, ilen = this.toLoad.length; i < ilen; i++) {
          return this.requestData(this.toLoad[i])
            .then(response => this.loadSheet(response.json()))
            .catch(this.handleError);
        }
      })
      .catch(this.handleError);
  }

  /*
    Parse a single list-based worksheet, turning it into a Tabletop Model
    Used as a callback for the list-based JSON
  */
  private loadSheet(data) {
    this.raw = data;
    for (var key in data.feed.entry[0]){
      if (/^gsx/.test(key)) {
        this.columnNames.push(key.replace('gsx$',''));
      }
    }
    var columnIds = {
      'timestamp': 'timestamp',
      'prénometnom': 'speaker_name',
      'email': 'email',
      'titredetaprésentation': 'title',
      'formats': 'format',
      'descriptiondetaprésentation': 'description',
      'genre': 'genre',
      'note': 'note',
      'décision': 'decision',
      'orateurok': 'validate',
      'silepublicnedevaitretenirquunechoseceserait': 'resume',
      'tuveuxajouterquelquechose': 'more'
    };
    
    for (let i = 0, ilen =  data.feed.entry.length ; i < ilen; i++) {
      var source = data.feed.entry[i];
      var element = {};
      for (let j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
        var cell = source['gsx$' + this.columnNames[j]];
        if (typeof(cell) !== 'undefined') {
          if (cell.$t !== '' && !isNaN(cell.$t)) {
            element[columnIds[this.columnNames[j]]] = +cell.$t;
          } else {
            element[columnIds[this.columnNames[j]]] = cell.$t;
          }
        } else {
          element[this.columnNames[j]] = '';
        }
      }
      if (element['rowNumber'] === undefined) {
        element['rowNumber'] = i + 1;
      }
      this.elements.push(element);
    }

    console.log(this);
    return this.elements;
  }

  /*
    * Store column names as an object
    * with keys of Google-formatted "columnName"
    * and values of human-readable "Column name"
    */
  private getPrettyColumns(data) {
    var prettyColumns = {};

    var columnNames = this.columnNames;

    var i = 0;
    var l = columnNames.length;

    for (; i < l; i++) {
      if (typeof data.feed.entry[i].content.$t !== 'undefined') {
        prettyColumns[columnNames[i]] = data.feed.entry[i].content.$t;
      } else {
        prettyColumns[columnNames[i]] = columnNames[i];
      }
    }

    return this.prettyColumns = prettyColumns;
  }

  private fetchPrettyColumns(): Promise<any> {
    const cellurl = this.raw['feed'].link[3].href.replace('/feeds/list/', '/feeds/cells/').replace('https://spreadsheets.google.com', '');

    return this.requestData(cellurl)
      .then(response => this.getPrettyColumns(response.json()))
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
