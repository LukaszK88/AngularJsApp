angular.module('myApp')
    .controller('SignupCtrl', function($scope, $location, $auth) {

        $scope.signup = function(user) {
            $auth.signup(user)
                .then(function(response) {
                    $auth.setToken(response);
                    $location.path('/');
                })
                .catch(function(response) {
                    $scope.errors = response.data.errors;
                });
        };
    });