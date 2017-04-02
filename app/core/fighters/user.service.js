'use strict';

angular.
    module('userService').
        factory('User', function($http, $resource){

            var userFactory = {};

            userFactory.store = function (email) {
              return  $http.post('http://127.0.0.1:8000/api/fighters/store', email);
            };

            return userFactory;

        });