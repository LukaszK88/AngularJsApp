'use strict';

angular.
    module('appCore').
        factory('User', function($http, $resource){

            var userFactory = {};

            userFactory.store = function (data) {
              return  $http.post('http://127.0.0.1:8000/api/fighters/store', data);
            };

            return userFactory;

        });