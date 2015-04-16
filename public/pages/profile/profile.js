app.controller('ProfileCtrl', function ($scope, $http, $routeParams, $location)
{
    // get username from URL and see that user is currently logged in
	var username = $routeParams.username;
	$scope.isCurrentUser = $scope.$parent.user != '0' && username == $scope.$parent.user.username;

    // The chevron next to "Following" on the profile should twirl down when clicked
    $('#followingCollapse').on('show.bs.collapse', function () {
        $('#collapseLink span').removeClass('fa-chevron-up');
        $('#collapseLink span').addClass('fa-chevron-down');
    });
    $('#followingCollapse').on('hide.bs.collapse', function () {
        $('#collapseLink span').removeClass('fa-chevron-down');
        $('#collapseLink span').addClass('fa-chevron-up');
    });

    // grab user from db
    // $scope.profileUser -> user of currently-viewed profile
    // $scope.$parent.user -> currently logged-in user
	$http.get('/user/' + username)
	.success(function (user) {
		if (!user) {
			$scope.errorMessage = "User " + username + " not found";
		} else {
			$scope.profileUser = user;
		}
        // Refresh follow button state
		setFollowButtons();
    })
    .error(function (data) {
    	$scope.errorMessage = data;
    });

    // Retrieves profileUser's reviews
    $http.get('/reviewsByUser/' + username)
    .success(function (reviews) {
        $scope.reviews = reviews;
    })
    .error(function (data) {
        $scope.errorMessage = data;
    })

    // Called when logged-in user wants to follow 
    // user in currently-viewed profile (profielUser)
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

    // Called when logged-in user wants to unfollow 
    // user in currently-viewed profile (profielUser)
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

    // If logged-in user is not following user in currently-viewed profile, show FOLLOW button
    // If logged-in user is following user in currently-viewed profile, show UNFOLLOW button
    // Note: follow/unfollow button is only shown when a user is logged in
    var setFollowButtons = function () {
    	var isFollowingProfileUser = $scope.$parent.user != '0' && $scope.$parent.user.following.indexOf(username) != -1;
    	var loggedInAndNotViewingOwnProfile = !$scope.isCurrentUser && $scope.$parent.user!='0' && $scope.profileUser;
		$scope.showFollow = loggedInAndNotViewingOwnProfile && !isFollowingProfileUser;
		$scope.showUnfollow = loggedInAndNotViewingOwnProfile && isFollowingProfileUser
    };

});