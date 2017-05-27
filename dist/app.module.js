/// <reference path="_all.ts" />
/// <reference path="app.config.ts" />
/// <reference path="filters/abs.ts" />
var myApp;
(function (myApp) {
    "use strict";
    angular
        .module("myApp", [
        "ngRoute",
        "ui.router",
        'ngResource',
        'ngMessages',
        // 'ngAnimate',
        'satellizer',
        'ngMaterial',
        'ngFileUpload',
        //Internal
        'myApp.ranking'
    ]);
})(myApp || (myApp = {}));
