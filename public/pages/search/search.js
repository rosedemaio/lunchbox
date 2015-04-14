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

    $scope.formatIngredients = function(ingredients) {
        var ingredientList = ingredients.join(", ");
        var pWidth = $('.ingredient-list').width();
        var charWidth = 2.45;
        var maxChars = Math.floor((pWidth-100)/charWidth);
        if (ingredientList.length > maxChars) {
            ingredientList = ingredientList.substring(0, maxChars-3);
            var lastComma = ingredientList.lastIndexOf(",")
            ingredientList = ingredientList.substring(0, lastComma);
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