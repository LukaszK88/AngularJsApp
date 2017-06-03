var myApp;
(function (myApp) {
    'use-strict';
    var AdminCtrl = (function () {
        function AdminCtrl($http, $scope, $location, FighterResource, $stateParams, Upload, Achievement, Toast, User) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.FighterResource = FighterResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
            this.Toast = Toast;
            this.User = User;
            this.$scope.placeholder = this.$location.$$protocol + '://' + this.$location.$$host + '/img/profile_placeholder.png';
            this.User.getUnauthorized().$promise.then(function (response) {
                _this.$scope.unUsers = response;
            });
        }
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
        'UserResource'
    ];
    myApp.AdminCtrl = AdminCtrl;
    angular.module('myApp').controller('myApp.AdminCtrl', AdminCtrl);
})(myApp || (myApp = {}));
