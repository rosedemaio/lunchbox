var app = angular.module("LunchboxApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: '../pages/home.html'
    }).
    when('/browse', {
        templateUrl: '../pages/browse.html'
    }).
    when('/search', {
        templateUrl: '../pages/search.html'
    }).
    when('/my-recipes', {
        templateUrl: '../pages/my-recipes.html'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);