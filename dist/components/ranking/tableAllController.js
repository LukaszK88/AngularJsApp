var myApp;
(function (myApp) {
    var ranking;
    (function (ranking) {
        'use-strict';
        var TableAllController = (function () {
            function TableAllController($http, $scope, $location, FighterResource, $stateParams) {
                var _this = this;
                this.$http = $http;
                this.$scope = $scope;
                this.$location = $location;
                this.FighterResource = FighterResource;
                this.$stateParams = $stateParams;
                $scope.selectedIndex = 0;
                $scope.$watch('selectedIndex', function (current, old) {
                    if (current) {
                        _this.$scope.total = false;
                        _this.$scope.bohurt = false;
                        _this.$scope.profight = false;
                        _this.$scope.swordShield = false;
                        _this.$scope.longsword = false;
                        _this.$scope.swordBuckler = false;
                        _this.$scope.polearm = false;
                        _this.$scope.triathlon = false;
                    }
                    switch (current) {
                        case 0:
                            _this.$scope.total = true;
                            break;
                        case 1:
                            _this.$scope.bohurt = true;
                            break;
                        case 2:
                            _this.$scope.profight = true;
                            break;
                        case 3:
                            _this.$scope.swordShield = true;
                            break;
                        case 4:
                            _this.$scope.longsword = true;
                            break;
                        case 5:
                            _this.$scope.swordBuckler = true;
                            break;
                        case 6:
                            _this.$scope.polearm = true;
                            break;
                        case 7:
                            _this.$scope.triathlon = true;
                            break;
                    }
                });
                this.FighterResource.get().$promise
                    .then(function (response) {
                    $scope.fighters = response.fighters;
                });
            }
            return TableAllController;
        }());
        TableAllController.$inject = [
            '$http',
            '$scope',
            '$location',
            'FighterResource',
            '$stateParams'
        ];
        ranking.TableAllController = TableAllController;
        angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
    })(ranking = myApp.ranking || (myApp.ranking = {}));
})(myApp || (myApp = {}));
