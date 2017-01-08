import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Talks } from './talks';

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
  key: string = '1I8mJSe6PgrUBmpGHCqtDWcxsSfLWPN11Ezi14bmJ1Iw';
  baseJsonPath: string;
  columnNames: string[] = [];
  elements: Object[] = [];

  constructor(
    private http: Http,
    private _jsonp: Jsonp
  ) {}

  /*
    Use Cross-Origin XMLHttpRequest to get the data in browsers that support it.
  */
  xhrFetch(path, callback) {
    const endpoint = 'https://spreadsheets.google.com';

    //support IE8's separate cross-domain object
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint + path);
    var self = this;
    xhr.onload = function() {
      var json;
      try {
        json = JSON.parse(xhr.responseText);
      } catch (e) {
        console.error(e);
      }
      callback.call(self, json);
    };
    xhr.send();
  }

  requestData(path, callback) {
    var supportsCORS = false;
    var inLegacyIE = false;
    try {
      var testXHR = new XMLHttpRequest();
      if (typeof testXHR.withCredentials !== 'undefined') {
        supportsCORS = true;
      } else {
        if ('XDomainRequest' in window) {
          supportsCORS = true;
          inLegacyIE = true;
        }
      }
    } catch (e) { }

    const endpoint = 'https://spreadsheets.google.com';

    //CORS only works in IE8/9 across the same protocol
    //You must have your server on HTTPS to talk to Google, or it'll fall back on injection
    var protocol = endpoint.split('//').shift() || 'http';
    if (supportsCORS && (!inLegacyIE || protocol === location.protocol)) {
      this.xhrFetch(path, callback);
    }
  }

  /*
    Load all worksheets of the spreadsheet, turning each into a Tabletop Model.
    Need to use injectScript because the worksheet view that you're working from
    doesn't actually include the data. The list-based feed (/feeds/list/key..) does, though.
    Calls back to loadSheet in order to get the real work done.

    Used as a callback for the worksheet-based JSON
  */
  loadSheets(data) {
    var i, ilen;
    let toLoad = [];
    let foundSheetNames = [];

    for (i = 0, ilen = data.feed.entry.length; i < ilen ; i++) {
      foundSheetNames.push(data.feed.entry[i].title.$t);
      var linkIdx = data.feed.entry[i].link.length-1;
      var sheetId = data.feed.entry[i].link[linkIdx].href.split('/').pop();
      var jsonPath = '/feeds/list/' + this.key + '/' + sheetId + '/public/values?alt=json';

      toLoad.push(jsonPath);
    }

    this.sheetsToLoad = toLoad.length;
    for(i = 0, ilen = toLoad.length; i < ilen; i++) {
      this.requestData(toLoad[i], this.loadSheet);
    }
  }

  /*
    Parse a single list-based worksheet, turning it into a Tabletop Model
    Used as a callback for the list-based JSON
  */
  loadSheet(data) {
    for (var key in data.feed.entry[0]){
      if (/^gsx/.test(key)) {
        this.columnNames.push(key.replace('gsx$',''));
      }
    }

    for (let i = 0, ilen =  data.feed.entry.length ; i < ilen; i++) {
      var source = data.feed.entry[i];
      var element = {};
      for (let j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
        var cell = source['gsx$' + this.columnNames[j]];
        if (typeof(cell) !== 'undefined') {
          if (cell.$t !== '' && !isNaN(cell.$t)) {
            element[this.columnNames[j]] = +cell.$t;
          } else {
            element[this.columnNames[j]] = cell.$t;
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
  }

  getTalks() {
    this.baseJsonPath = '/feeds/worksheets/' + this.key + '/public/basic?alt=json';
    this.requestData(this.baseJsonPath, this.loadSheets);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
