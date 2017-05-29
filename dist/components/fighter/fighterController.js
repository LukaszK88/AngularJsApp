var myApp;
(function (myApp) {
    'use-strict';
    var FighterCtrl = (function () {
        function FighterCtrl($http, $scope, $location, FighterResource, $stateParams, Upload, Achievement, Toast) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.FighterResource = FighterResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
            this.Toast = Toast;
            $scope.$watch('file', function (newVal, oldVal) {
                if (newVal) {
                    _this.Upload.upload({
                        url: 'http://127.0.0.1:8000/api/storePhoto/' + _this.$scope.currentUser.id,
                        data: {
                            file: _this.$scope.file
                        }
                    }).then(function (response) {
                        console.log(response);
                        _this.$scope.fighter.image = response.data.imageUrl;
                        _this.Toast.makeToast('success', response.data.message);
                    });
                }
            });
            this.FighterResource.get({ fighterId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                $scope.fighter = response.fighters;
            });
            this.Achievement.get({ userId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                $scope.achievements = response.data.data;
                $scope.stats = response.data.achievement;
            });
        }
        FighterCtrl.prototype.fighterLoggedIn = function () {
            if (this.$scope.currentUser) {
                if (this.$stateParams['fighterId'] == this.$scope.currentUser.id) {
                    return true;
                }
            }
        };
        FighterCtrl.prototype.deleteAchievement = function (id) {
            var _this = this;
            this.Achievement.deleteThis({ userId: this.$stateParams['fighterId'], achievementId: id }).$promise
                .then(function (response) {
                _this.Toast.makeToast('error', response.message);
            });
        };
        return FighterCtrl;
    }());
    FighterCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'FighterResource',
        '$stateParams',
        'Upload',
        'AchievementResource',
        'toastService'
    ];
    myApp.FighterCtrl = FighterCtrl;
    angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
})(myApp || (myApp = {}));
