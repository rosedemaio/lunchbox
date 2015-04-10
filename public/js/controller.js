var app = angular.module("LunchboxApp", ["ngRoute"]);

app.controller('LunchboxController', function($scope, $http, $location)
{
    $http.get('/loggedin').success(function (user) {
        $scope.user = user;
    });

    $scope.logout = function () {
    	$http.post('/logout').success(function (response) {
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
        templateUrl: '../pages/search/search.html',
        controller: 'SearchCtrl'
    }).
    when('/my-recipes', {
        templateUrl: '../pages/my-recipes/my-recipes.html'
    }).
    when('/login', {
        templateUrl: '../pages/login/login.html',
        controller: 'LoginCtrl'
    }).
    when('/signup', {
        templateUrl: '../pages/register/register.html',
        controller: 'RegisterCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);
