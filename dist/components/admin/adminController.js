var myApp;
(function (myApp) {
    'use-strict';
    var AdminCtrl = (function () {
        function AdminCtrl($http, $scope, $location, FighterResource, $stateParams, Upload, Achievement, Toast, User, _) {
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.FighterResource = FighterResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
            this.Toast = Toast;
            this.User = User;
            this._ = _;
            this.unUsers = [];
            this.blockedUsers = [];
            this.placeholder = this.$location.$$protocol + '://' + this.$location.$$host + '/img/profile_placeholder.png';
            this.fetchBlockedUsers();
            this.fetchUnautorizedUsers();
        }
        AdminCtrl.prototype.fetchUnautorizedUsers = function () {
            var _this = this;
            this.User.admin.getUnauthorized({ action: 'unauthorized' }).$promise.then(function (response) {
                _this.unUsers = response;
            });
        };
        AdminCtrl.prototype.fetchBlockedUsers = function () {
            var _this = this;
            this.User.admin.getBlocked({ action: 'blocked' }).$promise.then(function (response) {
                _this.blockedUsers = response;
            });
        };
        AdminCtrl.prototype.approveUser = function (user) {
            var _this = this;
            this.User.admin.approve({ userId: user.id, action: 'approve' }).$promise.then(function (response) {
                if (_this._.find(_this.unUsers, user)) {
                    var index = _this.unUsers.indexOf(user);
                    _this.unUsers.splice(index, 1);
                }
                if (_this._.find(_this.blockedUsers, user)) {
                    var index = _this.blockedUsers.indexOf(user);
                    _this.blockedUsers.splice(index, 1);
                }
                _this.Toast.makeToast('success', response.message);
            });
        };
        AdminCtrl.prototype.removeUser = function (user) {
            var _this = this;
            this.User.admin.remove({ userId: user.id, action: 'remove' }).$promise.then(function (response) {
                var index = _this.unUsers.indexOf(user);
                if (_this._.find(_this.unUsers, user)) {
                    var index_1 = _this.unUsers.indexOf(user);
                    _this.unUsers.splice(index_1, 1);
                }
                if (_this._.find(_this.blockedUsers, user)) {
                    var index_2 = _this.blockedUsers.indexOf(user);
                    _this.blockedUsers.splice(index_2, 1);
                }
                _this.Toast.makeToast('error', response.message);
            });
        };
        AdminCtrl.prototype.blockUser = function (user) {
            var _this = this;
            this.User.admin.block({ userId: user.id, action: 'block' }).$promise.then(function (response) {
                var index = _this.unUsers.indexOf(user);
                _this.unUsers.splice(index, 1);
                _this.fetchBlockedUsers();
                _this.Toast.makeToast('error', response.message);
            });
        };
        return AdminCtrl;
    }());
    AdminCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'FighterResource',
        '$stateParams',
        'Upload',
        'AchievementResource',
        'toastService',
        'UserResource',
        '_'
    ];
    myApp.AdminCtrl = AdminCtrl;
    angular.module('myApp').controller('myApp.AdminCtrl', AdminCtrl);
})(myApp || (myApp = {}));
