app.controller("MyRecipesCtrl", function ($scope, $http, $location) {

	// Gets favorite recipes
	$http.get('/recipes')
	.success(function (response) {
		$scope.recipes = response;
	});
});