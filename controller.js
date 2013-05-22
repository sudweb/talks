
function TalkController($scope){
  $scope.talks = [];

  $.ss("http://spreadsheets.google.com/tq?key=" + TalkController.getUrlArgument('key'))
    .setQuery("select *")
    .setField("date,first_name,blah,last_name,talk_40,themes,audience,audience_level,keywords,language,title,description,sex,location,email,phone,transportation,hosting,expectations,freespeech,talk_20,talk_lt,talk_workshop,url,rating,remarks,total")
    .send(function(){
      $scope.talks = this;

      $scope.$apply('');
    });
}

TalkController.getUrlArgument = function getUrlArgument(key){
  var value = '';

  location.search.replace(new RegExp(key+'=([^&$]+)'), function(m, matched_value){
    value = matched_value;
  });

  return value;
}

TalkController.$inject = ['$scope'];