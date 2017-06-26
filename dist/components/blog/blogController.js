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
            //youtube player
            function onYouTubeIframeAPIReady() {
                this.player = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    videoId: 'M7lc1UVf-VE',
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
                event.target.playVideo();
            }
            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;
            function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.PLAYING && !done) {
                    setTimeout(stopVideo, 6000);
                    done = true;
                }
            }
            function stopVideo() {
                this.player.stopVideo();
            }
            $scope.methods = {};
            this.currentState = $state.current.name;
            this.Image.query({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.images = response;
            });
            if ($stateParams['categoryId']) {
                this.BlogResource.post.getByType({ type: this.$stateParams['categoryId'] }).$promise.then(function (response) {
                    _this.posts = response;
                });
            }
            //For front page, maybe we can change to pull trough one call
            this.BlogResource.post.getByType({ type: 'news' }).$promise.then(function (response) {
                _this.news = response;
            });
            this.BlogResource.post.getByType({ type: 'header' }).$promise.then(function (response) {
                _this.headers = response;
            });
            //-----
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
