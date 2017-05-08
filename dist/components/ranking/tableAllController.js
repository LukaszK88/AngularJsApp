var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use-strict';
        var TableAllController = (function () {
            function TableAllController($http, $scope) {
                this.$http = $http;
                this.$scope = $scope;
                this.$http.get("http://127.0.0.1:8000/api/fighters/")
                    .then(function (response) {
                    $scope.fighters = response.data.fighters;
                });
            }
            return TableAllController;
        }());
        TableAllController.$inject = [
            '$http',
            '$scope'
        ];
        ranking.TableAllController = TableAllController;
        angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));
