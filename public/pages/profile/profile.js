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
			$scope.profileUser = user;
		}
		setFollowButtons();
    })
    .error(function (data) {
    	$scope.errorMessage = data;
    });

    $http.get('/reviewsByUser/' + username)
    .success(function (reviews) {
        $scope.reviews = reviews;
    })
    .error(function (data) {
        $scope.errorMessage = data;
    })

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