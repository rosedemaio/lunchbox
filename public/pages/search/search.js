app.controller('SearchCtrl', function($scope, $http, $location, $routeParams)
{
    var query = $routeParams.query;

    // invoked when user clicks search button
    // given recipe model that contains q property (query string)
    $scope.encodeRecipeAndSearch = function (recipe) {
        var encodedQuery = encodeURI(recipe.q);
        $location.path("search/" + encodedQuery);
    }

    // invoked when URL with query string is hit
    $scope.decodeQueryAndSearch = function (query) {
        var recipe = { q: decodeURI(query) }
        $scope.recipe = recipe;
        $scope.search(recipe)
    }

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

    if (query) { 
        $scope.decodeQueryAndSearch(query); 
    }

    $scope.formatIngredients = function(ingredients) {
        var maxIngredients = 7;
        var displayedIngredients = ingredients.slice(0,maxIngredients);
        var ingredientList = displayedIngredients.join(", ");
        if (ingredients.length > maxIngredients) {
            ingredientList += "...";
        }
        return ingredientList;
    }

    $scope.formatTime = function(time) {
        time = parseInt(time);
        var hrs = Math.floor(time/3600);
        var min = Math.floor((time%3600)/60);
        var timeStr = hrs ? hrs + " hr, " + min + " min" : min + " min";
        return timeStr;
    }

});