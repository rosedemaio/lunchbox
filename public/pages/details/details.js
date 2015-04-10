app.controller("DetailsCtrl", function ($scope, $http, $routeParams, $location) {
    var recipeId = $routeParams.recipeId;
    var params = {
        _app_id: "6e96cfda",
        _app_key: "555f5bd10dffba7229ea6a9ec32c0705",
        callback: "JSON_CALLBACK"
    }
    $http.jsonp("http://api.yummly.com/v1/api/recipe/" + recipeId + "?" + $.param(params))
    .success(function (response) {
        console.log(response);
        $scope.recipe = response;
    })
    .error(function (data) {
        $scope.errorMessage = data;
    });

});