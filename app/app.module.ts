/// <reference path="_all.ts" />
/// <reference path="app.config.ts" />
/// <reference path="filters/abs.ts" />
module myApp{
    "use strict";
    angular
        .module("myApp", [
            "ngRoute",
            "ui.router",
            'ngResource',
            'ngMessages',
            'ngSanitize',
            'ngTouch',
            'ngFlag',
            'validation.match',
            'ngAnimate',
            'satellizer',
            'ngMaterial',
            'ngFileUpload',
            //Internal
            'myApp.ranking',
            'textCollapse',
            'thatisuday.ng-image-gallery',
            'FBAngular',
            'angularSuperGallery',
            'angularTrix',
            'ui.bootstrap',
            'timer',
            'videosharing-embed',
            '720kb.socialshare'

        ])
        .constant('_', window._)
        .constant('config',{
            API : 'http://127.0.0.1:8000/api/',
            basePath: 'http://ranking.com/'
            // editorsDefault : {
            //     categories: {
            //         1 : false,
            //         2 : false,
            //         3 : false
            //     }
            // }
        });
}