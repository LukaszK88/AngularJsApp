
angular.module('mainController', ['authService']).
    controller('mainCtrl', function (Auth, $http, $location, $rootScope, $routeParams, $scope, $timeout) {


                $scope.loginUser = function (data) {
                   Auth.login(data).then(function (data) {

                        if(data.data.message) {
                            $scope.message = data.data.message;
                            $timeout(function () {
                                $location.path('/')
                            },2000);
                        }else {
                            $scope.authError = data.data.authError;
                            $scope.errors = data.data.errors;
                            console.log(data.data.errors);
                        }

                    });

            }
        });
