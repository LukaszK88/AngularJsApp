/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    BlogResource.$inject = [
        '$resource',
        'config'
    ];
    function BlogResource($resource, config) {
        return {
            post: $resource(config.API + 'post/:postId', {
                postId: '@postId'
            }, {
                get: {
                    method: 'get',
                    params: {
                        postId: '@postId'
                    }
                },
                query: {
                    method: 'get',
                    isArray: true
                },
                update: {
                    method: 'PUT'
                }
            })
        };
    }
    angular.module('myApp')
        .factory('BlogResource', BlogResource);
})(myApp || (myApp = {}));
