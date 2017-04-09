'use-strict';

angular.module('ranking').
component('tableBohurt', {

    templateUrl: 'app/components/ranking/tableBohurt.template.html',

    controller: function ($http, $filter, $location, $rootScope, $routeParams, $scope) {

        $http.get("http://127.0.0.1:8000/api/fighters/bohurt")
            .then(function(response) {
                $scope.fighters = response.data.fighters;

            });


    }
});
