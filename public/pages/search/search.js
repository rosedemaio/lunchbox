app.controller('SearchCtrl', function($scope, $http, $location)
{
    $scope.search = function (recipe) {
        var params = {
            _app_id: "6e96cfda",
            _app_key: "555f5bd10dffba7229ea6a9ec32c0705",
            callback: "JSON_CALLBACK"
        }
        $.extend(params, recipe);
        $http.jsonp('http://api.yummly.com/v1/api/recipes?' + $.param(params))
        .success(function (response) {
            $scope.recipes = response.matches;
        })
        .error(function (data) {
            console.log(data);
        });
    }
});