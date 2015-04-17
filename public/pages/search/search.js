app.controller('SearchCtrl', function($scope, $http, $location, $routeParams)
{
    // the search query for the Yummly API call
    var query = $routeParams.query;

    // override the parent controller's deferredSerializeRecipe
    // because we have to make a special API call
    $scope.deferredSerializeRecipe = function (recipe) {
        var defer = $.Deferred();
            var params = {
            _app_id: "6e96cfda",
            _app_key: "555f5bd10dffba7229ea6a9ec32c0705",
            callback: "JSON_CALLBACK"
        }
        $http.jsonp("http://api.yummly.com/v1/api/recipe/" + recipe.id + "?" + $.param(params))
        .success(function (fullRecipe) {
            var serializedRecipe = $scope.$parent.serializeRecipe(fullRecipe);
            defer.resolve(serializedRecipe);
        });
        return defer;
    }

    // invoked when user clicks search button
    // given recipe model that contains q property (query string)
    $scope.encodeRecipeAndSearch = function (recipe) {
        var encodedQuery = encodeURI(recipe.q);
        $location.path("search/" + encodedQuery);
    }

    // invoked when URL with query string is hit
    // i.e. #/search/cake -> search page with cake as seach term
    $scope.decodeQueryAndSearch = function (query) {
        var recipe = { q: decodeURI(query) }
        $scope.recipe = recipe;
        $scope.search(recipe)
    }

    // actually calls the Yummly API with the query and params
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

    // Sets key event for when user presses enter after entering search term
    $scope.searchBarKeypress = function ($event, recipe) {
        if ($event.keyCode == 13) {
            $scope.encodeRecipeAndSearch(recipe);
        }
    }

    // if URL has search term (i.e. #/search/cake), decode it and search it
    if (query) { 
        $scope.decodeQueryAndSearch(query); 
    }

});