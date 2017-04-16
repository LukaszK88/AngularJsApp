
angular.module('mainController', ['appCore']).
    controller('mainCtrl', function (Auth,$auth , $http, $location, $rootScope, $routeParams, $scope, $timeout, $window) {

            $rootScope.$on('$routeChangeStart', function () {
                if($auth.isAuthenticated()){
                    Auth.currentUser().then(function (data) {
                        $scope.currentUser = data.data;
                    });
                }else{
                        $scope.currentUser = '';
                }
            });

            $scope.logout = function () {
                $auth.logout();
                $timeout(function () {
                    $location.path('/');
                    $window.location.reload();
                },1000);
            };

                $scope.login = function(user) {
                    $auth.login(user)
                        .then(function(data) {

                            console.log(data);
                            $location.path('/');
                        })
                        .catch(function(error) {
                            console.log(error.data.error);
                            $scope.errors = error.data.error
                        });
                };



                $scope.authenticate = function(provider) {
                    $auth.authenticate(provider).then(function(response) {
                        $timeout(function () {
                            $location.path('/');
                            $window.location.reload();
                        },1000);
                    }).catch(function(response) {
                        // Something went wrong.
                    });
                };
});
