angular.module('talksFilters', [])
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
      'talk_lt': 'Lightning Talk',
      'talk_workshop': 'Élaboratoire'
    };

    return function(talks, fields){
      return (talks || []).filter(function(talk){
        if (talk.formats.trim() === ''){
          return true;
        }

        return Object.keys(fields).some(function(field){
          return !!(~talk.formats.indexOf(mapping[field])) === fields[field];
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
      console.log(rating)

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