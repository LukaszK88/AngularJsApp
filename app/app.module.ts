/// <reference path="_all.ts" />
/// <reference path="app.config.ts" />
/// <reference path="filters/abs.ts" />
module myApp{
    "use strict";
    angular
        .module("myApp", [
            "ngRoute",
            'ngResource',
            'ngMessages',
            // 'ngAnimate',
            'satellizer',
            'ngMaterial',
            'ngFileUpload',
            //Internal
            'myApp.ranking'

        ]);
}