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
            this.achievements = [];
            this.fetchAchievements();
            $scope.$watch('file', function (newVal, oldVal) {
                if (newVal) {
                    _this.Upload.upload({
                        url: 'http://127.0.0.1:8000/api/storePhoto/' + _this.$scope.currentUser.id,
                        data: {
                            file: _this.$scope.file
                        }
                    }).then(function (response) {
                        //console.log(response);
                        _this.$scope.fighter.image = response.data.imageUrl;
                        _this.Toast.makeToast('success', response.data.message);
                    });
                }
            });
            this.FighterResource.get({ fighterId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                $scope.fighter = response.fighters;
            });
        }
        FighterCtrl.prototype.hideForm = function () {
            this.$scope.showform = false;
        };
        FighterCtrl.prototype.fetchAchievements = function () {
            var _this = this;
            this.Achievement.get({ userId: this.$stateParams['fighterId'] }).$promise
                .then(function (response) {
                _this.achievements = response.data;
            });
        };
        FighterCtrl.prototype.updateAchievement = function (achievement) {
            var _this = this;
            this.Achievement.save({ userId: this.$stateParams['fighterId'] }, achievement).$promise.then(function (response) {
                _this.fetchAchievements();
                _this.Toast.makeToast('success', 'Achievement updated');
            });
        };
        FighterCtrl.prototype.addAchievement = function (data) {
            var _this = this;
            this.Achievement.save({ userId: this.$stateParams['fighterId'] }, data).$promise.then(function (response) {
                console.log(response.data);
                _this.achievements.data.push(response.data);
                _this.fetchAchievements();
                _this.Toast.makeToast('success', response.message);
            });
        };
        FighterCtrl.prototype.fighterLoggedIn = function () {
            if (this.$scope.currentUser) {
                if (this.$stateParams['fighterId'] == this.$scope.currentUser.id) {
                    return true;
                }
            }
        };
        FighterCtrl.prototype.deleteAchievement = function (achievement) {
            var _this = this;
            this.Achievement.deleteThis({ userId: this.$stateParams['fighterId'], achievementId: achievement.id }).$promise
                .then(function (response) {
                var index = _this.achievements.data.indexOf(achievement);
                _this.achievements.data.splice(index, 1);
                _this.fetchAchievements();
                _this.Toast.makeToast('error', response.message);
                //console.log(this.achievements);
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
