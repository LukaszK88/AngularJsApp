/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    UserResource.$inject = [
        '$resource'
    ];

    function UserResource($resource:any){

        return $resource(
            'http://127.0.0.1:8000/api/user/:userId',
            {
                userId: '@userId',
            },
            {
                getUnauthorized: {
                   method: 'GET',
                    isArray: true,
                    url:  'http://127.0.0.1:8000/api/user/unauthorized',
                },
                recover: {
                   method: 'POST',
                   //isArray: true,
                   url: 'http://127.0.0.1:8000/api/user/recover',
                },
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
        .factory('UserResource', UserResource);

}
