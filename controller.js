"use strict";

const jQuery = global.jQuery = require('jquery');
const bootstrap = require('bootstrap');

/**
 * Talks Controller
 *
 * @param {ng.scope} $scope
 * @param {ng.http} $http
 * @constructor
 */
function TalkController ($scope, $http) {
  var spreadsheet_url = "https://spreadsheets.google.com/tq?key=%%key%%&tqx=responseHandler:JSON_CALLBACK;out:json";
  var $scrollSpy = jQuery('body').scrollspy({
    target: '#talk-summary .list-group-capped',
    offset: 150
  }).data('bs.scrollspy');
  var refreshSpy = setTimeout.bind(null, $scrollSpy.refresh.bind($scrollSpy), 250);

  $scrollSpy.selector = '#talk-summary .list-group-capped a.list-group-item';

  spreadsheet_url = spreadsheet_url.replace('%%key%%', TalkController.getUrlArgument('key'));

  $scope.talks = [];
  $scope.editionYear = null;
  $scope.display = {
    talk_40: true,
    talk_20: true,
    talk_lt: true,
    talk_workshop: true
  };

  $scope.sort = {
    field: '',
    reverse: false
  };

  $scope.$watch('display.talk_40', refreshSpy);
  $scope.$watch('display.talk_20', refreshSpy);
  $scope.$watch('display.talk_lt', refreshSpy);
  $scope.$watch('display.talk_workshop', refreshSpy);
  $scope.$watch('sort.field', refreshSpy);
  $scope.$watch('talks', refreshSpy);

  $scope.toggleDisplay = function toggleDisplay (category) {
    $scope.display[category] = ($scope.display[category] ? false : true);
  };

  $scope.toggleSort = function toggleSort () {
    var isSorted = !!$scope.sort.field;

    $scope.sort.field = isSorted ? '' : 'total';
    $scope.sort.reverse = isSorted ? false : true;
  };

  $http.jsonp(spreadsheet_url)
    .success(function dataSuccess(response) {
      $scope.talks = TalkController.mapResponseFields(response);

      $scope.editionYear = $scope.talks[0].created_at.getUTCFullYear() + 1;
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

  return response.table.rows.map(function (row, i) {
    var data = { id: i+1 };

    row.c.forEach(function fieldMapper(column, index) {
      if (fields[index]) {
        data[ fields[index] ] = column.v;
      }
    });

    // remaps Sud Web < 2014 proposal formats
    if (!('formats' in data)){
      data.formats = [];

      Object.keys(TalkController.fieldMapping.talks).forEach(function(field){
        if (!data.hasOwnProperty(field)) {
          return;
        }

        if (['Non', 'No', '-1'].indexOf(data[field]) === -1){
          data.formats.push(TalkController.fieldMapping.talks[field]);
        }

        delete data[field];
      });

      data.formats = data.formats.join(',');
    }

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

TalkController.getMappingFromColumns = function getMappingFromColumns(){
  return TalkController.fieldMapping['formFields'];
};

TalkController.fieldMapping = {
  talks: {
    "talk_40": "40 minutes",
    "talk_20": "20 minutes",
    "talk_lt": "Lightning Talk",
    "talk_workshop": "Élaboratoire"
  },
  formFields: {
    "Timestamp":                                                                     "created_at",
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
    "Total":                                                                         "total",
    "Note":                                                                          "total",
    "Prénom et nom":                                                                 "speaker_name",
    "Votre adresse email":                                                           "email",
    "Ton adresse email":                                                             "email",
    "Titre":                                                                         "title",
    "Titre de la présentation":                                                      "title",
    "Formats":                                                                       "formats",
    "Que devrait en retenir le public ?":                                            "description",
    "Description de la présentation":                                                "description",
    "Remarques, questions ?":                                                        "expectations",
    "Si le public ne devait retenir qu'une chose du LT, ce serait quoi ?":           "expectations",
    "Des remarques ? Des questions ? Des besoins particuliers ?":                    "remarks"
  }
};

// Explicit injection
TalkController.$inject = ['$scope', '$http'];

module.exports = TalkController;