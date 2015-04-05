app.controller('LoginCtrl', function($scope, $http, $location)
{
    $scope.login = function(user)
    {
        $http.post('/login', user)
        .success(function(response)
        {
            $scope.$parent.user = response;
            console.log($scope.$parent);
            $location.path("/");
        });
    }
});