'use strict';

const angular = require('angular');

Number.isNaN = Number.isNaN || function(value) {
  return typeof value === "number" && isNaN(value);
};

module.exports = angular.module('talksFilters', [])
  .filter('labelify', function(){
    return function(label){
      return (label+'')
        .replace(/(1|Oui|Yes)/i, "label label-success")
        .replace(/(-1|Non|No)/i, "label label-empty")
        .replace(/(0|Envisageable|Maybe)/i, "label label-maybe");
    };
  })
  .filter('byFormat', function(){
    var mapping = {
      '40 minutes': 'talk_40',
      '20 minutes': 'talk_20',
      'Lightning Talk': 'talk_lt',
      'Élaboratoire': 'talk_workshop'
    };

    return function(talks, formatsDisplay){
      return (talks || []).filter(function(talk){
        if (talk.formats.trim() === ''){
          return true;
        }

        return talk.formats.split(',').some(function(format){
          var formatId = mapping[format];

          return formatsDisplay[formatId];
        });
      });
    };
  })
  .filter('ratify', function(){
    return function(rating){
      if (Number.isNaN(rating) || typeof rating !== 'number'){
        return '-';
      }

      return rating;
    };
  })
  .filter('moodify', function(){
    return function(rating){
      var label = [];

      if (rating < 0){
        label.push('negative');
      }

      if (rating === 0){
        label.push('neutral');
      }

      if (rating > 0){
        label.push('positive');
      }

      if (rating === 2)
      {
        label.push('favorite');
      }


      return label.join(' ');
    };
  })
  .filter('tagify', function(){
    return function(text, splitChar){
      var keywords = (text+'').trim();

      if (!keywords.match(',') && splitChar === undefined){
        keywords = keywords.match('[A-Z]')
          ? keywords.replace(/\s+([A-Z])/g, ', $1')
          : keywords.replace(/\s+/g, ', ');
      }

      return keywords.split(splitChar || ',');
    };
  });
