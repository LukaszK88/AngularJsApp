/**
 * Created by lukas on 20/05/17.
 */
module myApp {

    'use strict';

    ImageResource.$inject = [
        '$resource',
        'config'
    ];

    function ImageResource(
        $resource:any,
        config:any
    ){

        return $resource(
            config.API + 'images/:postId/:userId',
            {   postId: '@postId',
                userId: '@userId' },
            {
                getGalleryById: {
                   method: 'GET',
                    isArray: true,
                   url: config.API + 'images/gallery/:postId',

                }
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
        .factory('ImageResource', ImageResource);

}
