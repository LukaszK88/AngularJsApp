/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    ImageResource.$inject = [
        '$resource',
        'config'
    ];
    function ImageResource($resource, config) {
        return $resource(config.API + 'images/:postId/:userId', { postId: '@postId',
            userId: '@userId' }, {});
    }
    angular.module('myApp')
        .factory('ImageResource', ImageResource);
})(myApp || (myApp = {}));
