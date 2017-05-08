'use strict';
angular.module('myApp').
    directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/nav/nav.template.html',
        link: function (scope, element, attr) {
        }
    };
});
