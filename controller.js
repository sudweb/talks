
function TalkController($scope, $http){
  $scope.talks = [];

  $http.jsonp("https://spreadsheets.google.com/tq?key=" + TalkController.getUrlArgument('key')+"&tqx=responseHandler:JSON_CALLBACK;out:json")
    .success(function(response){

      $scope.talks = response.table.rows.map(function(row){
        var data = {};

        row.c.forEach(function(column, index){
          data[ TalkController.fields[index] ] = column.v;
        });

        return data;
      });
    });
}

TalkController.getUrlArgument = function getUrlArgument(key){
  var value = '';

  location.search.replace(new RegExp(key+'=([^&$]+)'), function(m, matched_value){
    value = matched_value;
  });

  return value;
}

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

TalkController.$inject = ['$scope', '$http'];