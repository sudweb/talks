"use strict";

/**
 * Talks Controller
 *
 * @param {ng.scope} $scope
 * @param {ng.http} $http
 * @constructor
 */
function TalkController($scope, $http){
  var spreadsheet_url = "https://spreadsheets.google.com/tq?key=%%key%%&tqx=responseHandler:JSON_CALLBACK;out:json";

  spreadsheet_url = spreadsheet_url.replace('%%key%%', TalkController.getUrlArgument('key'));

  $http.jsonp(spreadsheet_url)
    .success(function(response){

      $scope.talks = TalkController.mapResponseFields(response);
    });
}

/**
 * Retrieves an URI value for a specific argument
 *
 * @param {String} key
 * @returns {string}
 */
TalkController.getUrlArgument = function getUrlArgument(key){
  var value = '';

  location.search.replace(new RegExp(key+'=([^&$]+)'), function(m, matched_value){
    value = matched_value;
  });

  return value;
};

/**
 * Maps JSON response to an array of "Talk" objects
 *
 * @param {Object} response
 * @returns {Array.<Object>}
 */
TalkController.mapResponseFields = function mapResponseFields(response){
  return response.table.rows.map(function(row){
    var data = {};

    row.c.forEach(function(column, index){
      data[ TalkController.fields[index] ] = column.v;
    });

    return data;
  });
};

//@todo handle mapping with field names to avoid relying on column order (good for BC)
TalkController.fields = [
  "date",
  "first_name",
  "blah",
  "last_name",
  "talk_40",
  "themes",
  "audience",
  "audience_level",
  "keywords",
  "language",
  "title",
  "description",
  "sex",
  "location",
  "email",
  "phone",
  "transportation",
  "hosting",
  "expectations",
  "freespeech",
  "talk_20",
  "talk_lt",
  "talk_workshop",
  "url",
  "rating",
  "remarks",
  "total"
];

// Explicit injection
TalkController.$inject = ['$scope', '$http'];