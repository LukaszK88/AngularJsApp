var myApp;
(function (myApp) {
    'use-strict';
    var EditorCtrl = (function () {
        function EditorCtrl($http, $scope, $location, $stateParams, Upload, Toast, _, types, blog, config, $state) {
            //$scope.category = config.editorsDefault.categories;
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Toast = Toast;
            this._ = _;
            this.types = types;
            this.blog = blog;
            this.config = config;
            this.$state = $state;
            this.postTypes = [];
            this.posts = [];
            this.postToEdit = [];
            this.postEdit = false;
            $scope.files = [];
            $scope.photo = [];
            this.types.query().$promise.then(function (response) {
                _this.postTypes = response;
            });
            $scope.$watch('active', function (newVal) {
                if (newVal === 1) {
                    _this.activeTab = 1;
                }
                else if (newVal === 2) {
                    _this.activeTab = 2;
                }
                else {
                    _this.activeTab = 0;
                }
            });
        }
        EditorCtrl.prototype.update = function (post) {
            var _this = this;
            if (post) {
                post.post_type = this.post.post_type;
                this.blog.post.update({ postId: post.id }, post).$promise.then(function (response) {
                    _this.Toast.makeToast('success', 'Post updated');
                    _this.postEdit = false;
                    _this.post.post_type = post.post_type;
                    _this.fetchPosts(post.post_type);
                });
            }
        };
        EditorCtrl.prototype.editPost = function (post) {
            this.postEdit = true;
            this.postToEdit = post;
        };
        EditorCtrl.prototype.deletePost = function (post) {
            var _this = this;
            this.blog.post["delete"]({ postId: post.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Post deleted');
                var index = _this.posts.indexOf(post);
                _this.posts.splice(index, 1);
            });
        };
        EditorCtrl.prototype.fetchPosts = function (type) {
            var _this = this;
            if (this.activeTab === 2) {
                this.blog.post.getByType({ type: type }).$promise.then(function (response) {
                    _this.posts = response;
                });
            }
        };
        EditorCtrl.prototype.submit = function (post) {
            var _this = this;
            if (post) {
                post.user_id = this.$scope.currentUser.id;
                if (this.activeTab === 1) {
                    post.gallery = 1;
                    post.post_type = 2;
                }
                this.blog.post.save(post).$promise.then(function (response) {
                    _this.postId = response.id;
                    if (_this.activeTab === 1) {
                        _this.uploadGalleryPhotos();
                        _this.Toast.makeToast('success', 'Gallery added');
                        _this.$state.reload();
                    }
                    else {
                        _this.uploadHeaderPhoto();
                        _this.uploadGalleryPhotos();
                        _this.Toast.makeToast('success', 'Post added');
                        _this.$state.reload();
                    }
                });
            }
        };
        EditorCtrl.prototype.uploadHeaderPhoto = function () {
            if (this.$scope.photo) {
                this.Upload.upload({
                    url: this.config.API + 'images/post/' + this.postId + '/' + 1,
                    data: {
                        file: this.$scope.photo
                    }
                });
            }
        };
        EditorCtrl.prototype.uploadGalleryPhotos = function () {
            var _this = this;
            if (this.$scope.files) {
                this._.forEach(this.$scope.files['photos'], (function (value, key) {
                    _this.Upload.upload({
                        url: _this.config.API + 'images/post/' + _this.postId + '/' + 2,
                        data: {
                            file: value
                        }
                    });
                }));
            }
        };
        return EditorCtrl;
    }());
    EditorCtrl.$inject = [
        '$http',
        '$scope',
        '$location',
        '$stateParams',
        'Upload',
        'toastService',
        '_',
        'PostTypeResource',
        'BlogResource',
        'config',
        '$state'
    ];
    myApp.EditorCtrl = EditorCtrl;
    angular.module('myApp').controller('myApp.EditorCtrl', EditorCtrl);
})(myApp || (myApp = {}));
