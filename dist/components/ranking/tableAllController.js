var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use-strict';
        var TableAllController = (function () {
            function TableAllController($http, $scope, $location, FighterResource) {
                var _this = this;
                this.$http = $http;
                this.$scope = $scope;
                this.$location = $location;
                this.FighterResource = FighterResource;
                this.$scope.$watch('selectedIndex', function (newVal, old) {
                    console.log(newVal);
                    _this.$path = newVal;
                });
                // if(this.$path = '0'){
                //
                //      //  .then(function(response: ng.IHttpPromiseCallbackArg<any>) {
                //             //$scope.fighters = this.FighterResource.query();
                //     console.log(this.FighterResource.get());
                //
                //         // });
                // }
                if (this.$path = '1') {
                    this.$http.get("http://127.0.0.1:8000/api/fighters")
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
            '$location',
            'FighterResource'
        ];
        ranking.TableAllController = TableAllController;
        angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));
