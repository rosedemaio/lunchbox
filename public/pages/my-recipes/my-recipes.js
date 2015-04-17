app.controller("MyRecipesCtrl", function ($scope, $http, $location) {	

	// Gets favorite recipes
	$scope.getFavoriteRecipes = function() {
		$http.get('/recipes')
		.success(function (response) {
			$scope.recipes = response;
		});
	}

	$scope.getFavoriteRecipes();
});