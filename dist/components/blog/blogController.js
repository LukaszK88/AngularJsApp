var myApp;
(function (myApp) {
    'use-strict';
    var BlogCtrl = (function () {
        //protected textLimit:number = 150;
        function BlogCtrl($http, $scope, $location, BlogResource, $stateParams, Upload, Image, Toast, $state, _) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
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
            this.nature1 = [];
            this.showModal = false;
            this.nature1Options = [];
            $scope.methods = {};
            this.BlogResource.post.query().$promise.then(function (response) {
                _this.posts = response;
            });
            this.BlogResource.post.get({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                console.log(response);
                _this.post = response;
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
            $scope.openGallery = function () {
                $scope.methods.open();
            };
            // Similar to above function
            $scope.closeGallery = function () {
                $scope.methods.close();
            };
            $scope.nextImg = function () {
                $scope.methods.next();
            };
            $scope.prevImg = function () {
                $scope.methods.prev();
            };
        }
        BlogCtrl.prototype.goBack = function () {
            this.$state.go("blog");
        };
        return BlogCtrl;
    }());
    BlogCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        'BlogResource',
        '$stateParams',
        'Upload',
        'ImageResource',
        'toastService',
        '$state',
        '_'
    ];
    myApp.BlogCtrl = BlogCtrl;
    angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
})(myApp || (myApp = {}));
