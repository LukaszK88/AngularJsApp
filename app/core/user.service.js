'use strict';

angular.
    module('appCore').
        factory('User', function($http, $resource, $mdToast){

            var userFactory = {};

            userFactory.toast = function(type, string){
                $mdToast.show(
                    $mdToast.simple()
                        .content(string)
                        .theme(type + "-toast")
                        .parent($("#bs-example-navbar-collapse-1"))
                        .position('top center')
                        .hideDelay(4000)
                        .action('OK')
                );
            };

            return userFactory;
        });