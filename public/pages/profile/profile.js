app.controller('ProfileCtrl', function ($scope, $http, $routeParams, $location)
{
	var username = $routeParams.username;
	$scope.isCurrentUser = $scope.$parent.user != '0' && username == $scope.$parent.user.username;

    $('#followingCollapse').on('show.bs.collapse', function () {
        $('#collapseLink span').removeClass('fa-chevron-up');
        $('#collapseLink span').addClass('fa-chevron-down');
    });
    $('#followingCollapse').on('hide.bs.collapse', function () {
        $('#collapseLink span').removeClass('fa-chevron-down');
        $('#collapseLink span').addClass('fa-chevron-up');
    });

	$http.get('/user/' + username)
	.success(function (user) {
		if (!user) {
			$scope.errorMessage = "User " + username + " not found";
		} else {
            user.reviews = [
                {
                    rating: 5,
                    text: "This is recipe is so great OMGGGG I make it all the time it's soooooo delicious I just can't stop thinking about it",
                    recipeId: "French-Onion-Soup-1019866",
                    recipeName: "French Onion Soup"
                },
                {
                    rating: 3,
                    text: "This is recipe is kinda meh. Like whatever. I don't even care. Now I'm tired. I'm gonna take a nap kbyeeeeeeeeeee.",
                    recipeId: "Irish-American-Onion-Soup-1061263",
                    recipeName: "Irish American Onion Soup"
                }
            ];
			$scope.profileUser = user;
		}
		setFollowButtons();
    })
    .error(function (data) {
    	$scope.errorMessage = data;
    });

    $scope.follow = function() {
    	$http.put('/follow', $scope.profileUser)
        .success(function (response) {
            $scope.$parent.user = response;
            setFollowButtons()
        })
        .error(function (data) {
            $scope.errorMessage = data;
        });
    };

    $scope.unfollow = function() {
    	$http.put('/unfollow', $scope.profileUser)
        .success(function (response) {
            $scope.$parent.user = response;
            setFollowButtons()
        })
        .error(function (data) {
            $scope.errorMessage = data;
        });
    };

    var setFollowButtons = function () {
    	var isFollowingProfileUser = $scope.$parent.user != '0' && $scope.$parent.user.following.indexOf(username) != -1;
    	var loggedInAndNotViewingOwnProfile = !$scope.isCurrentUser && $scope.$parent.user!='0' && $scope.profileUser;
		$scope.showFollow = loggedInAndNotViewingOwnProfile && !isFollowingProfileUser;
		$scope.showUnfollow = loggedInAndNotViewingOwnProfile && isFollowingProfileUser
    };

});