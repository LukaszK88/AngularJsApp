var myApp;
(function (myApp) {
    'use-strict';
    var GalleryCtrl = (function () {
        //protected textLimit:number = 150;
        function GalleryCtrl($http, $scope, $location, BlogResource, $stateParams, Upload, Achievement, Toast, $state, _) {
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
            this.BlogResource.post.get({ postId: $stateParams['postId'] }).$promise.then(function (response) {
                _this.post = response;
            });
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
                    transition: 'zoomInOut',
                    caption: false
                },
                panel: {
                    thumbnail: {
                        "class": "col-md-3"
                    }
                },
                image: {
                    height: 210,
                    wide: true,
                    transition: 'fadeInOut'
                }
            };
            this.nature1 = [
                {
                    link: "portfolio/fullsize/2.jpg",
                    thumbnail: "portfolio/fullsize/2.jpg",
                    medium: "portfolio/fullsize/2.jpg"
                }, {
                    link: "portfolio/fullsize/1.jpg",
                    thumbnail: "portfolio/fullsize/1.jpg",
                    medium: "portfolio/fullsize/1.jpg"
                }, {
                    link: "portfolio/fullsize/3.jpg",
                    thumbnail: "portfolio/fullsize/3.jpg",
                    medium: "portfolio/fullsize/3.jpg"
                }, {
                    link: "portfolio/fullsize/4.jpg",
                    thumbnail: "portfolio/fullsize/4.jpg",
                    medium: "portfolio/fullsize/4.jpg"
                }, {
                    link: "portfolio/fullsize/5.jpg",
                    thumbnail: "portfolio/fullsize/5.jpg",
                    medium: "portfolio/fullsize/5.jpg"
                }
            ];
        }
        GalleryCtrl.prototype.goBack = function () {
            this.$state.go("^");
        };
        return GalleryCtrl;
    }());
    GalleryCtrl.$inject = [
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
    myApp.GalleryCtrl = GalleryCtrl;
    angular.module('myApp').controller('myApp.GalleryCtrl', GalleryCtrl);
})(myApp || (myApp = {}));
