var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use-strict';
        var TableAllController = (function () {
            function TableAllController($http, $scope, $location) {
                var _this = this;
                this.$http = $http;
                this.$scope = $scope;
                this.$location = $location;
                this.$scope.$watch('selectedIndex', function (newVal, old) {
                    console.log(newVal);
                    _this.$path = newVal;
                });
                if (this.$path = '0') {
                    this.$http.get("http://127.0.0.1:8000/api/fighters/")
                        .then(function (response) {
                        $scope.fighters = response.data.fighters;
                    });
                }
                if (this.$path = '1') {
                    this.$http.get("http://127.0.0.1:8000/api/fighters/bohurt/")
                        .then(function (response) {
                        $scope.fighters = response.data.fighters;
                    });
                }
            }
            return TableAllController;
        }());
        TableAllController.$inject = [
            '$http',
            '$scope',
            '$location'
        ];
        ranking.TableAllController = TableAllController;
        angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));
