"use strict";

/**
 * Talks Controller
 *
 * @param {ng.scope} $scope
 * @param {ng.http} $http
 * @constructor
 */
function TalkController ($scope, $http) {
  var spreadsheet_url = "https://spreadsheets.google.com/tq?key=%%key%%&tqx=responseHandler:JSON_CALLBACK;out:json";

  spreadsheet_url = spreadsheet_url.replace('%%key%%', TalkController.getUrlArgument('key'));

  $scope.display = {
    talk_lt: true,
    talk_workshop: true
  };

  $scope.toggleDisplay = function toggleDisplay (category) {
    $scope.display[category] = ($scope.display[category] ? false : true);
  };

  $http.jsonp(spreadsheet_url)
    .success(function dataSuccess(response) {
      $scope.talks = TalkController.mapResponseFields(response);
    });
}

/**
 * Retrieves an URI value for a specific argument
 *
 * @param {String} key
 * @returns {string}
 */
TalkController.getUrlArgument = function getUrlArgument (key) {
  var value = '';

  location.search.replace(new RegExp(key + '=([^&$]+)'), function (m, matched_value) {
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
TalkController.mapResponseFields = function mapResponseFields (response) {
  var fields = TalkController.mapResponseHeaderFields(response.table.cols);

  return response.table.rows.map(function (row) {
    var data = {};

    row.c.forEach(function fieldMapper(column, index) {
      if (fields[index]) {
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
TalkController.mapResponseHeaderFields = function mapResponseHeaderFields (columns) {
  var fields = {};
  var mapping = TalkController.getMappingFromColumns(columns);

  columns.forEach(function columnMapper(column, index) {
    if (mapping[column.label]) {
      fields[index] = mapping[column.label];
    }
  });

  return fields;
};

TalkController.getMappingFromColumns = function getMappingFromColumns(columns){
  return TalkController.fieldMapping[columns.length <= 10 ? 'current' : 'legacy'];
};

TalkController.fieldMapping = {
  legacy: {
    "TS":                                                                            "first_name",
    "First Name":                                                                    "first_name",
    "Nom":                                                                           "last_name",
    "Last Name":                                                                     "last_name",
    "Thématique concernée":                                                          "themes",
    "Related to":                                                                    "themes",
    "Public ciblé":                                                                  "audience",
    "Audience":                                                                      "audience",
    "Niveau d'expérience souhaité du public":                                        "audience_level",
    "Audience Level : Beginner, intermediate, expert":                               "audience_level",
    "Mots clés caractérisant la conférence":                                         "keywords",
    "Tags and related keywords":                                                     "keywords",
    "Langue parlée pendant la conférence":                                           "language",
    "Spoken language during the talk":                                               "language",
    "Titre de la conférence":                                                        "title",
    "Title of your presentation":                                                    "title",
    "Description":                                                                   "description",
    "Sexe":                                                                          "genre",
    "Gender":                                                                        "genre",
    "Provenance":                                                                    "location",
    "Location":                                                                      "location",
    "Adresse email":                                                                 "email",
    "Email":                                                                         "email",
    "Numéro de téléphone":                                                           "phone",
    "Phone":                                                                         "phone",
    "Mode de déplacement envisagé":                                                  "transportation",
    "Transportation means":                                                          "transportation",
    "Besoin d'être hébergé":                                                         "hosting",
    "Souhaits, attentes et remarques vis à vis de Sud Web":                          "expectations",
    "Expectations about Sud Web":                                                    "expectations",
    "Autres remarques et questions.":                                                "freespeech",
    "Any questions ?":                                                               "freespeech",
    "Possible formats for this session [40 minutes presentation]":                   "talk_40",
    "Format(s) d'intervention possible pour ce sujet [Conférence de 20 minutes]":    "talk_20",
    "Possible formats for this session [20 minutes presentation]":                   "talk_20",
    "Format(s) d'intervention possible pour ce sujet [Lightning Talk de 5 minutes]": "talk_lt",
    "Possible formats for this session [5 minutes Lightning Talk]":                  "talk_lt",
    "Format(s) d'intervention possible pour ce sujet [Atelier/Dojo/BarCamp]":        "talk_workshop",
    "Possible formats for this session [Workshop/Open Forum/Barcamp]":               "talk_workshop",
    "URL":                                                                           "url",
    "N/A":                                                                           "rating",
    "Remarques":                                                                     "remarks",
    "Note":                                                                          "total"
  },
  current: {
    "Prénom et nom":                      "speaker_name",
    "Votre adresse email":                "email",
    "Titre":                              "title",
    "Formats":                            "formats",
    "Que devrait en retenir le public ?": "description",
    "Remarques, questions ?":             "expectations",
    "Remarques":                          "remarks",
    "Note":                               "total"
  }
};

// Explicit injection
TalkController.$inject = ['$scope', '$http'];
