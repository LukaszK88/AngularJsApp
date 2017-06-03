/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    UserResource.$inject = [
        '$resource'
    ];
    function UserResource($resource) {
        return $resource('http://127.0.0.1:8000/api/user/:userId', {
            userId: '@userId'
        }, {
            getUnauthorized: {
                method: 'GET',
                isArray: true,
                url: 'http://127.0.0.1:8000/api/user/unauthorized'
            },
            recover: {
                method: 'POST',
                //isArray: true,
                url: 'http://127.0.0.1:8000/api/user/recover'
            }
        });
    }
    angular.module('myApp')
        .factory('UserResource', UserResource);
})(myApp || (myApp = {}));
