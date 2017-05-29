/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    AchievementResource.$inject = [
        '$resource'
    ];
    function AchievementResource($resource) {
        return $resource('http://127.0.0.1:8000/api/achievement/:userId/:achievementId', { userId: '@userId',
            achievementId: '@achievementId' }, {
            deleteThis: {
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/achievement/:userId/:achievementId/delete',
                params: {
                    userId: '@userId',
                    achievementId: '@achievementId'
                }
            }
        });
    }
    angular.module('myApp')
        .factory('AchievementResource', AchievementResource);
})(myApp || (myApp = {}));
