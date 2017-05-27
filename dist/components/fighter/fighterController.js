var myApp;
(function (myApp) {
    'use-strict';
    var FighterCtrl = (function () {
        function FighterCtrl($http, $scope, $location, FighterResource, $stateParams, Upload) {
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.FighterResource = FighterResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.FighterResource.get({ fighterId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                $scope.fighter = response.fighters;
            });
        }
        FighterCtrl.prototype.fighterLoggedIn = function (currentUser) {
            if (currentUser) {
                if (this.$stateParams['fighterId'] = currentUser.id) {
                    return true;
                }
            }
        };
        return FighterCtrl;
    }());
    FighterCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'FighterResource',
        '$stateParams',
        'Upload'
    ];
    myApp.FighterCtrl = FighterCtrl;
    angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
})(myApp || (myApp = {}));
