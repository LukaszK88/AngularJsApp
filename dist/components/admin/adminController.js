var myApp;
(function (myApp) {
    'use-strict';
    var AdminCtrl = (function () {
        function AdminCtrl($http, $scope, $location, FighterResource, $stateParams, Upload, Achievement, Toast) {
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.FighterResource = FighterResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
            this.Toast = Toast;
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
        'toastService'
    ];
    myApp.AdminCtrl = AdminCtrl;
    angular.module('myApp').controller('myApp.AdminCtrl', AdminCtrl);
})(myApp || (myApp = {}));
