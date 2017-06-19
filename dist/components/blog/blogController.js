var myApp;
(function (myApp) {
    'use-strict';
    var BlogCtrl = (function () {
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
            this.news = [];
            this.headers = [];
            this.tournaments = [];
            $scope.methods = {};
            this.currentState = $state.current.name;
            if (this.currentState === 'tournaments') {
                this.fetchTournaments();
            }
            this.Image.query({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.images = response;
            });
            // this.BlogResource.post.query().$promise.then((response)=>{
            //     this.posts = response;
            //
            // });
            this.BlogResource.post.getByType({ type: 3 }).$promise.then(function (response) {
                _this.news = response;
            });
            this.BlogResource.post.getByType({ type: 1 }).$promise.then(function (response) {
                _this.headers = response;
            });
            if ($stateParams['postId']) {
                this.BlogResource.post.get({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                    _this.post = response;
                });
            }
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
        BlogCtrl.prototype.fetchTournaments = function () {
            var _this = this;
            this.BlogResource.post.getByType({ type: 4 }).$promise.then(function (response) {
                _this.tournaments = response;
                var now = new Date().getTime();
                _this._.forEach(_this.tournaments, (function (value, key) {
                    //  let countdown = (new Date(value.date).getTime()) - now;
                    //value.date = Math.floor((countdown % (1000 * 60)) / 1000);
                    value.date = ((new Date(value.date).getTime() - now) / 1000);
                }));
                console.log(_this.tournaments);
            });
        };
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
