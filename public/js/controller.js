var app = angular.module("LunchboxApp", ["ngRoute"]);

app.controller('LunchboxController', function($scope, $http, $location)
{
    $http.get('/loggedin').success(function(user)
    {
        console.log("logged in user:", user);
        $scope.user = user;
    });

    $scope.logout = function () {
    	$http.post('/logout').success(function(response)
	    {
	        $scope.user = '0';
	        $location.url('/home');
	    });
    };
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: '../pages/home/home.html'
    }).
    when('/browse', {
        templateUrl: '../pages/browse/browse.html'
    }).
    when('/search', {
        templateUrl: '../pages/search/search.html'
    }).
    when('/my-recipes', {
        templateUrl: '../pages/my-recipes/my-recipes.html'
    }).
    when('/login', {
        templateUrl: '../pages/login/login.html',
        controller: 'LoginCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });

    // $httpProvider
    // .interceptors
    // .push(function($q, $location)
    // {
    //     return {
    //         response: function(response)
    //         { 
    //             return response;
    //         },
    //         responseError: function(response)
    //         {
    //             if (response.status === 401)
    //                 $location.url('/login');
    //             return $q.reject(response);
    //         }
    //     };
    // }); 
}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
            deferred.resolve();
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    
    return deferred.promise;
};
