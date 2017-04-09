'use-strict';

angular.module('ranking').
component('tableAll', {

    templateUrl: 'app/components/ranking/tableAll.template.html',

    controller: function ($http, $location, $rootScope, $routeParams, $scope) {

               // $scope.fighters = $http.get('https://jsonplaceholder.typicode.com/users', config);
        $http.get("http://127.0.0.1:8000/api/fighters/")
            .then(function(response) {
                $scope.fighters = response.data.fighters;
            });



    }
});
