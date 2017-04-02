'use strict';

angular.
    module('authService').
        factory('Auth', function($http, $resource){


            var authFactory = {};

            authFactory.login = function (data) {
              //return  $http.post('http://127.0.0.1:8000/api/fighters/store', email);
            };

            return authFactory;



        });