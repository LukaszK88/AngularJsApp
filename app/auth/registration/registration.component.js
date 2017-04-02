'use-strict';

angular.module('registration').
        component('registration', {

            templateUrl: 'app/auth/registration/register.template.html',

            controller: function (User, $http, $location, $rootScope, $routeParams, $scope, $timeout) {



                $scope.registerUser = function (email) {
                    User.store(email).then(function (data) {

                        if(data.data.message) {
                            $scope.message = data.data.message;
                            $timeout(function () {
                                $location.path('/')
                            },2000);
                        }else {
                            $scope.errors = data.data.errors;
                        }

                    });
                }
            }
        });
