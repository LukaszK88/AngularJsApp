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
        return {
            user: $resource('http://127.0.0.1:8000/api/user/:userId', {
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
                },
                update: {
                    method: 'PUT'
                }
            }),
            admin: $resource('http://127.0.0.1:8000/api/admin/:userId/:action', {
                userId: '@userId',
                action: '@action'
            }, {
                getBlocked: {
                    method: 'GET',
                    isArray: true,
                    url: 'http://127.0.0.1:8000/api/admin/:action',
                    params: {
                        action: '@action'
                    }
                },
                getUnauthorized: {
                    method: 'GET',
                    isArray: true,
                    url: 'http://127.0.0.1:8000/api/admin/:action',
                    params: {
                        action: '@action'
                    }
                },
                block: {
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/api/admin/:userId/:action',
                    params: {
                        userId: '@userId',
                        action: '@action'
                    }
                },
                approve: {
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/api/admin/:userId/:action',
                    params: {
                        userId: '@userId',
                        action: '@action'
                    }
                },
                remove: {
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/api/admin/:userId/:action',
                    params: {
                        userId: '@userId',
                        action: '@action'
                    }
                }
            })
            //     // templateFields: {
            //     //     method: 'GET',
            //     //     isArray:true,
            //     //     url: AppConfig.apiPath + AppConfig.API.event + ':eventId/template-fields',
            //     //     params: {
            //     //         eventId: '@eventId'
            //     //     }
            //     // },
        };
    }
    angular.module('myApp')
        .factory('UserResource', UserResource);
})(myApp || (myApp = {}));
