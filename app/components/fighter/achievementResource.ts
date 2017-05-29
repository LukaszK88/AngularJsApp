/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    AchievementResource.$inject = [
        '$resource'
    ];

    function AchievementResource($resource:any){

        return $resource(
            'http://127.0.0.1:8000/api/achievement/:userId/:achievementId',
            {   userId: '@userId',
                achievementId: '@achievementId' },
            {
                deleteThis: {
                   method: 'POST',
                   url: 'http://127.0.0.1:8000/api/achievement/:userId/:achievementId/delete',
                   params: {
                       userId: '@userId',
                       achievementId: '@achievementId'
                   }
                },
                //getBySlug: {
                //    method: 'GET',
                //    isArray: false,
                //    url: AppConfig.apiPath + AppConfig.API.event + ':slug'
                //},
                // getFighterData: {
                //     method: 'GET',
                //     url:  'http://127.0.0.1:8000/api/fighters/tableData'
                // },
                // templateFields: {
                //     method: 'GET',
                //     isArray:true,
                //     url: AppConfig.apiPath + AppConfig.API.event + ':eventId/template-fields',
                //     params: {
                //         eventId: '@eventId'
                //     }
                // },
                // update: {
                //     method: 'PUT'
                // },

            });
    }

    angular.module('myApp')
        .factory('AchievementResource', AchievementResource);

}
