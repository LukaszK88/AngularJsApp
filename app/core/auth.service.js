'use strict';

angular.
    module('appCore').
        factory('Auth', function($http, $q, $auth, $window){


            var authFactory = {};

            authFactory.currentUser = function () {
                if($auth.getToken()){
                    return $http.get('http://127.0.0.1:8000/api/user');
                }else {
                    $q.reject({ message: 'User has no Token'});
                }
            };

            return authFactory;
});
