angular.module('talksFilters', [])
  .filter('labelify', function(){
    return function(label){
      return (label+'')
        .replace(/(1|Oui|Yes)/i, "label label-success")
        .replace(/(-1|Non|No)/i, "label label-empty")
        .replace(/(0|Envisageable|Maybe)/i, "label label-maybe");
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
    return function(text){
      var keywords = (text+'').trim();

      if (!keywords.match(',')){
        keywords = keywords.match('[A-Z]')
          ? keywords.replace(/\s+([A-Z])/g, ', $1')
          : keywords.replace(/\s+/g, ', ');
      }

      return keywords.split(',');
    };
  });