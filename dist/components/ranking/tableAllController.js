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
                this.leaderboard = [];
                this.newLeaderboard = [];
                $scope.selectedIndex = 0;
                this.getLeaderboardData();
                $scope.$watch('selectedIndex', function (current, old) {
                    switch (current) {
                        case 0:
                            _this.$scope.total = true;
                            break;
                        case 1:
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
            TableAllController.prototype.getLeaderboardData = function () {
                var _this = this;
                this.FighterResource.getLeaderboardData().$promise
                    .then(function (response) {
                    _this.leaderboard = response;
                    angular.forEach(_this.leaderboard, function (value, key) {
                        _this.leaderboard[key.replace('_', ' ')] = value;
                    });
                    delete _this.leaderboard['sword_shield'];
                    delete _this.leaderboard['sword_buckler'];
                });
            };
            TableAllController.prototype.getSum = function (category, column) {
                var total = 0;
                for (var y in category) {
                    total += category[y][column];
                }
                return total;
            };
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
