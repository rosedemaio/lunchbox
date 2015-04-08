app.controller('RegisterCtrl', function($scope, $http, $location)
{
    $scope.register = function (newuser) {
        var password2 = $('input#retypedPassword').val();
        if (newuser.password != password2) {
            $scope.errorMessage = 'Passwords do not match'
            return;
        }
        $http.post('/register', newuser)
        .success(function (response) {
            $scope.$parent.user = response;
            $location.path("/");
        })
        .error(function (data) {
            console.log(data);
            $scope.errorMessage = 'Registration failed';
        });
    }
});