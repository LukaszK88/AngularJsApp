var myApp;
(function (myApp) {
    'use-strict';
    var BlogCtrl = (function () {
        //protected textLimit:number = 150;
        function BlogCtrl($http, $scope, $location, BlogResource, $stateParams, Upload, Achievement, Toast, $state, _) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Achievement = Achievement;
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
                _this.post = response;
            });
            this.images = [
                {
                    id: 3,
                    //thumbUrl : 'http://ranking.com/img/portfolio/fullsize/1.jpg',
                    url: 'http://ranking.com/img/portfolio/fullsize/1.jpg'
                },
                {
                    id: 4,
                    //thumbUrl : 'http://ranking.com/img/portfolio/fullsize/2.jpg',
                    url: 'http://ranking.com/img/portfolio/fullsize/2.jpg'
                }
            ];
            this.showModal = false;
            this.nature1Options = {
                baseUrl: "http://ranking.com/img/",
                fields: {
                    source: {
                        modal: "link",
                        image: "medium",
                        panel: "thumbnail"
                    }
                },
                modal: {
                    wide: true,
                    transition: 'zoomInOut'
                },
                panel: {
                    thumbnail: {
                        "class": "col-md-4"
                    }
                },
                image: {
                    transition: 'fadeInOut'
                }
            };
            this.nature1 = [
                {
                    "link": "portfolio/fullsize/2.jpg",
                    "thumbnail": "portfolio/fullsize/2.jpg",
                    "medium": "portfolio/fullsize/2.jpg"
                }, {
                    "link": "portfolio/fullsize/1.jpg",
                    "thumbnail": "portfolio/fullsize/1.jpg",
                    "medium": "portfolio/fullsize/1.jpg"
                }
            ];
        }
        BlogCtrl.prototype.goBack = function () {
            this.$state.go("blog");
        };
        BlogCtrl.prototype.readMore = function (postId) {
            this.textLimit = 10000;
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
        'AchievementResource',
        'toastService',
        '$state',
        '_'
    ];
    myApp.BlogCtrl = BlogCtrl;
    angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
})(myApp || (myApp = {}));
