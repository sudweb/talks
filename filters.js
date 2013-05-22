angular.module('talksFilters', [])
  .filter('labelify', function(){
    return function(label){
      return (label+'')
        .replace(/(1|Oui|Yes)/i, "label label-success")
        .replace(/(-1|Non|No)/i, "label label-empty")
        .replace(/(0|Envisageable|Maybe)/i, "label label-maybe");
    };
  });