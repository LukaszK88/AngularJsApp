var myApp;
(function (myApp) {
    'use-strict';
    var GalleryCtrl = (function () {
        function GalleryCtrl($http, $scope, $rootScope, $location, BlogResource, $stateParams, Upload, Image, Toast, $state, _) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Image = Image;
            this.Toast = Toast;
            this.$state = $state;
            this._ = _;
            this.posts = [];
            this.post = [];
            this.images = [];
            $scope.methods = {};
            this.BlogResource.post.query({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.post = response;
            });
            this.Image.query({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.images = response.galleryImages;
            });
            $scope.conf = {
                thumbnails: true,
                thumbSize: 150,
                inline: false,
                bubbles: true,
                bubbleSize: 50,
                imgBubbles: true,
                bgClose: false,
                imgAnim: 'fadeup'
            };
        }
        GalleryCtrl.prototype.goBack = function () {
            this.$state.go("blogDetail", { postId: this.$stateParams['postId'] });
        };
        return GalleryCtrl;
    }());
    GalleryCtrl.$inject = [
        '$http',
        '$scope',
        '$rootScope',
        '$location',
        'BlogResource',
        '$stateParams',
        'Upload',
        'ImageResource',
        'toastService',
        '$state',
        '_'
    ];
    myApp.GalleryCtrl = GalleryCtrl;
    angular.module('myApp').controller('myApp.GalleryCtrl', GalleryCtrl);
})(myApp || (myApp = {}));
