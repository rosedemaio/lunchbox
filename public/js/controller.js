var app = angular.module("LunchboxApp", ["ngRoute"]);

app.controller('LunchboxController', function($scope, $http, $location, $sce)
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

    // used in several places to render star ratings
    // needs to be here to use in different views
     $scope.setRating = function(rating) {
        var i = 1;
        var stars = '';
        for(i; i <= 5; i++) {
            if (i <= rating) {
                stars += '<span class="fa fa-star"/>';
            } else {
                stars += '<span class="fa fa-star-o"/>';
            }
        }
        return stars
    }

    $scope.trust = $sce.trustAsHtml;
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: '../pages/home/home.html'
    }).
    when('/search', {
        templateUrl: '../pages/search/search.html',
        controller: 'SearchCtrl'
    }).
    when('/search/:query', {
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
     when('/profile/:username', {
        templateUrl: '../pages/profile/profile.html',
        controller: 'ProfileCtrl'
    }).
    when('/recipe/:recipeId', {
        templateUrl: '../pages/details/details.html',
        controller: 'DetailsCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);
