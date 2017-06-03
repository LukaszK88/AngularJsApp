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
            'ngFlag',
            'validation.match',
            // 'ngAnimate',
            'satellizer',
            'ngMaterial',
            'ngFileUpload',
            //Internal
            'myApp.ranking'

        ])
        .constant('_', window._);
}