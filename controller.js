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
  var fields = TalkController.mapResponseHeaderFields(response.table.cols);

  return response.table.rows.map(function(row){
    var data = {};

    row.c.forEach(function(column, index){
      if (fields[index]){
        data[ fields[index] ] = column.v;
      }
    });

    return data;
  });
};

/**
 * Create a data mapping between response column labels and rows index
 *
 * @param {Array.<{v: String, label: String}>} columns
 * @returns {Object} Key/Value array-like object
 */
TalkController.mapResponseHeaderFields = function mapResponseHeaderFields(columns){
  var fields = {};
  var mapping = TalkController.fieldMapping;

  columns.forEach(function(column, index){
    if (mapping[column.label]){
      fields[index] = mapping[column.label];
    }
  });

  return fields;
};

TalkController.fieldMapping = {
  "TS": "first_name",
  "Nom": "last_name",
  "Thématique concernée": "themes",
  "Public ciblé": "audience",
  "Niveau d'expérience souhaité du public": "audience_level",
  "Mots clés caractérisant la conférence": "keywords",
  "Langue parlée pendant la conférence": "language",
  "Titre de la conférence": "title",
  "Description": "description",
  "Sexe": "genre",
  "Provenance": "location",
  "Adresse email": "email",
  "Numéro de téléphone": "phone",
  "Mode de déplacement envisagé": "transportation",
  "Besoin d'être hébergé": "hosting",
  "Souhaits, attentes et remarques vis à vis de Sud Web": "expectations",
  "Autres remarques et questions.": "freespeech",
  "Format(s) d'intervention possible pour ce sujet [Conférence de 20 minutes]": "talk_20",
  "Format(s) d'intervention possible pour ce sujet [Lightning Talk de 5 minutes]": "talk_lt",
  "Format(s) d'intervention possible pour ce sujet [Atelier/Dojo/BarCamp]": "talk_workshop",
  "URL": "url",
  "N/A": "rating",
  "Remarques": "remarks",
  "Note": "total"
};

// Explicit injection
TalkController.$inject = ['$scope', '$http'];