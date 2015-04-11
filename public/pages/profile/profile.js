app.controller('ProfileCtrl', function ($scope, $http, $routeParams, $location)
{
	var username = $routeParams.username;
	$scope.isCurrentUser = $scope.$parent.user != '0' && username == $scope.$parent.user.username;

	$http.get('/user/' + username)
	.success(function (user) {
		if (!user) {
			$scope.errorMessage = "User " + username + " not found";
		} else {
			$scope.profileUser = user;
		}
    })
    .error(function (data) {
    	$scope.errorMessage = data;
    });

    $scope.follow = function() {
    	$http.post('/follow', $scope.profileUser)
        .success(function (response) {
            $scope.$parent.user = response;
        })
        .error(function (data) {
            $scope.errorMessage = data;
        });
    };

});