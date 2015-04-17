app.controller('SearchCtrl', function($scope, $http, $location, $routeParams)
{
    // the search query for the Yummly API call
    var query = $routeParams.query;

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

    // Formats list of ingredients in search results 
    // Displays no more than maxIngredients, cuts off with "..."
    $scope.formatIngredients = function(ingredients) {
        var maxIngredients = 7;
        var displayedIngredients = ingredients.slice(0,maxIngredients);
        var ingredientList = displayedIngredients.join(", ");
        if (ingredients.length > maxIngredients) {
            ingredientList += "...";
        }
        return ingredientList;
    }

    // Formats recipe's given time (in seconds by default) 
    // Displays as hours and minutes
    $scope.formatTime = function(time) {
        time = parseInt(time);
        var hrs = Math.floor(time/3600);
        var min = Math.floor((time%3600)/60);
        var timeStr = hrs ? hrs + " hr, " + min + " min" : min + " min";
        return timeStr;
    }

});