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
                userId: '@postId'
            }, {
                get: {
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
