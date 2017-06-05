var myApp;
(function (myApp) {
    'use-strict';
    var BlogCtrl = (function () {
        function BlogCtrl($http, $scope, $location, BlogResource, $stateParams, Upload, Achievement, Toast, User, _) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
            this.Toast = Toast;
            this.User = User;
            this._ = _;
            this.posts = [];
            this.BlogResource.post.get().$promise.then(function (response) {
                _this.posts = response;
            });
        }
        return BlogCtrl;
    }());
    BlogCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'BlogResource',
        '$stateParams',
        'Upload',
        'AchievementResource',
        'toastService',
        'UserResource',
        '_'
    ];
    myApp.BlogCtrl = BlogCtrl;
    angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
})(myApp || (myApp = {}));
