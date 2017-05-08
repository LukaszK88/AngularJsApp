'use strict';

angular.
    module('myApp').
        factory('Auth', function($http, $q, $auth, $window, $filter){


            var authFactory = {};

            authFactory.currentUser = function () {
                if($auth.getToken()){
                    return $http.get('http://127.0.0.1:8000/api/user');
                }else {
                    $q.reject({ message: 'User has no Token'});
                }
            };

            authFactory.updateUser = function (data) {
                if($auth.getToken()){

                    console.log(data.dob);

                    return $http.put('http://127.0.0.1:8000/api/fighters/update', data);
                }else {
                    $q.reject({ message: 'User has no Token'});
                }
            };

            return authFactory;

});
