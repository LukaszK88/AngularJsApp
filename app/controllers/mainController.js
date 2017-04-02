
angular.module('mainController', ['authService']).
    controller('mainCtrl', function (User, $http, $location, $rootScope, $routeParams, $scope, $timeout) {


                $scope.loginUser = function (data) {
                    // User.store(data).then(function (data) {
                    //
                    //     if(data.data.message) {
                    //         $scope.message = data.data.message;
                    //         $timeout(function () {
                    //             $location.path('/')
                    //         },2000);
                    //     }else {
                    //         $scope.errors = data.data.errors;
                    //     }
                    //
                    // });

            }
        });
