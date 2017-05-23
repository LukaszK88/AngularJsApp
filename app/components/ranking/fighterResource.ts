/**
 * Created by lukas on 20/05/17.
 */
module myApp.ranking {

    'use strict';

    FighterResource.$inject = [
        '$resource'
    ];

    function FighterResource($resource:any){

        return $resource(
            'http://127.0.0.1:8000/api/fighters/:id', { id: '@id' },
            {
                //confirmDelete: {
                //    method: 'GET',
                //    isArray: false,
                //    url: AppConfig.apiPath + AppConfig.API.event + 'confirm-delete/:id',
                //    params: {
                //        id: '@id'
                //    }
                //},
                //getBySlug: {
                //    method: 'GET',
                //    isArray: false,
                //    url: AppConfig.apiPath + AppConfig.API.event + ':slug'
                //},
                // getSettings: {
                //     method: 'GET',
                //     url: AppConfig.apiPath + AppConfig.API.event + ':eventId/settings/:type',
                //     params: {
                //         eventId: '@eventId',
                //         type: '@type'
                //     }
                // },
                saveUpdate: {
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/api/fighters/:type',
                    params: {
                        type: '@type'
                    }
                },
                // templateFields: {
                //     method: 'GET',
                //     isArray:true,
                //     url: AppConfig.apiPath + AppConfig.API.event + ':eventId/template-fields',
                //     params: {
                //         eventId: '@eventId'
                //     }
                // },
                update: {
                    method: 'PUT'
                },

            });
    }

    angular.module('myApp.ranking')
        .factory('FighterResource', FighterResource);

}
