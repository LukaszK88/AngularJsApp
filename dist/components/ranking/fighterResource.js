/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use strict';
        FighterResource.$inject = [
            '$resource',
            'config'
        ];
        function FighterResource($resource, config) {
            return $resource(config.API + 'fighters/:fighterId', { fighterId: '@fighterId' }, {
                //confirmDelete: {
                //    method: 'GET',
                //    isArray: false,
                //    url: AppConfig.apiPath + AppConfig.API.event + 'confirm-delete/:id',
                //    params: {
                //        id: '@id'
                //    }
                //},
                getFighterEventInfo: {
                    method: 'GET',
                    //isArray: true,
                    url: config.API + 'fighter/event-info/:eventAttendId/:userId',
                    params: {
                        eventAttendId: '@eventAttendId',
                        userId: '@userId'
                    }
                },
                getFighterData: {
                    method: 'GET',
                    url: config.API + 'fighters/tableData'
                },
                saveUpdate: {
                    method: 'POST',
                    url: config.API + 'fighters/:type',
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
                }
            });
        }
        angular.module('myApp.ranking')
            .factory('FighterResource', FighterResource);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));
