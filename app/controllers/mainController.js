
angular.module('mainController', ['appCore',]).
    controller('mainCtrl', function (Auth,$auth, User, $mdDialog , $http, $location, $rootScope, $routeParams, $scope, $timeout, $window) {

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
                },2000);
            User.toast('error', 'You are being logged out, redirecting...');
            };

                $scope.login = function(user) {
                    $auth.login(user)
                        .then(function(data) {

                            $location.path('/');
                            User.toast('success', data.data.message);
                        })
                        .catch(function(error) {
                            User.toast('error', error.data.error);
                        });
                };



                $scope.authenticate = function(provider) {
                    $auth.authenticate(provider).then(function(response) {
                        $timeout(function () {
                            $location.path('/');
                            $window.location.reload();
                        },2000);
                        User.toast('success',response.data.message);
                    }).catch(function(response) {
                        User.toast('error', 'Something went wrong');
                    });
                };
});
