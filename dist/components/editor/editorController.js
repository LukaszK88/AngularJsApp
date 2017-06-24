var myApp;
(function (myApp) {
    'use-strict';
    var EditorCtrl = (function () {
        function EditorCtrl($http, $scope, $location, $stateParams, Upload, Toast, _, types, blog, config, $state, image, $q, $timeout, eventResource, $filter, eventNotes) {
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
            this.image = image;
            this.$q = $q;
            this.$timeout = $timeout;
            this.eventResource = eventResource;
            this.$filter = $filter;
            this.eventNotes = eventNotes;
            this.postTypes = [];
            this.eventTypes = [];
            this.posts = [];
            this.postToEdit = [];
            this.postEdit = false;
            this.galleries = [];
            this.galleryEdit = false;
            this.galleryToEdit = [];
            this.uploadMore = false;
            this.categories = [];
            this.eventToEdit = [];
            this.events = [];
            this.noteToEdit = [];
            $scope.files = [];
            $scope.photo = [];
            $scope.selected = {};
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
                else if (newVal === 3) {
                    _this.activeTab = 3;
                    _this.fetchGalleries();
                }
                else if (newVal === 4) {
                    _this.activeTab = 4;
                    _this.eventResource.getTypes().$promise.then(function (response) {
                        _this.eventTypes = response;
                    });
                }
                else if (newVal === 5) {
                    _this.activeTab = 5;
                    _this.eventResource.getTypes().$promise.then(function (response) {
                        _this.eventTypes = response;
                    });
                    _this.fetchEvents();
                }
                else {
                    _this.activeTab = 0;
                }
            });
            $scope.date = {
                opened: false
            };
            $scope.dateOptions = {};
            $scope.format = 'dd-MMMM-yyyy';
            $scope.date = function () {
                $scope.date.opened = true;
            };
        }
        EditorCtrl.prototype.fetchEvents = function () {
            var _this = this;
            this.eventResource.query().$promise.then(function (response) {
                _this.events = response;
            });
        };
        EditorCtrl.prototype.uploadMoreImages = function (gallery) {
            var _this = this;
            this.postId = gallery.id;
            this.uploadGalleryPhotos();
            this.uploadMore = false;
            //fetch single gallery and clear selected photos
            this.$scope.files = [];
            //need to ait for upload
            this.$timeout(function () {
                _this.blog.post.get({ postId: _this.postId }).$promise.then(function (response) {
                    _this.Toast.makeToast('success', 'Photos Uploaded');
                    _this.galleryToEdit = response;
                });
            }, 1500);
        };
        EditorCtrl.prototype.deleteGallery = function (gallery) {
            var _this = this;
            this.image.deleteGallery({ postId: gallery.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Gallery deleted');
                var index = _this.galleries.indexOf(gallery);
                _this.galleries.splice(index, 1);
            });
        };
        EditorCtrl.prototype.deleteImg = function (img) {
            var _this = this;
            this.image["delete"]({ postId: img.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Photo deleted');
                var index = _this.galleryToEdit.image.indexOf(img);
                _this.galleryToEdit.image.splice(index, 1);
            });
        };
        EditorCtrl.prototype.deleteEvent = function (event) {
            var _this = this;
            this.eventResource["delete"]({ eventId: event.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Event deleted');
                var index = _this.events.indexOf(event);
                _this.events.splice(index, 1);
            });
        };
        EditorCtrl.prototype.updateEvent = function (eventToEdit) {
            var _this = this;
            eventToEdit.categories = this.$scope.selected;
            this.eventResource.update({ eventId: eventToEdit.id }, eventToEdit).$promise.then(function (response) {
                //TODO flexible method
                if (_this.$scope.photo) {
                    _this.Upload.upload({
                        url: _this.config.API + 'images/event/' + eventToEdit.id + '/' + 1,
                        data: {
                            file: _this.$scope.photo
                        }
                    });
                }
                _this.Toast.makeToast('success', 'Event updated');
                _this.$state.reload();
            });
        };
        EditorCtrl.prototype.editEvent = function (event) {
            var array = {};
            angular.forEach(event.category, function (value, key) {
                array[value.name] = true;
            });
            this.$scope.selected = array;
            this.eventEdit = true;
            this.eventToEdit = event;
        };
        EditorCtrl.prototype.editGallery = function (gallery) {
            this.galleryEdit = true;
            this.galleryToEdit = gallery;
        };
        EditorCtrl.prototype.fetchGalleries = function () {
            var _this = this;
            this.image.query().$promise.then(function (response) {
                _this.galleries = response;
            });
        };
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
        EditorCtrl.prototype.addEventData = function (eventData) {
            var _this = this;
            eventData.date = this.$filter('date')(eventData.date, 'yyyy-MM-dd');
            eventData.user_id = this.$scope.currentUser.id;
            //add categories
            eventData.categories = this.$scope.selected;
            return this.eventResource.save(eventData).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'Event added');
                return response;
            });
        };
        EditorCtrl.prototype.updateNote = function (note) {
            var _this = this;
            this.eventNotes.update({ noteId: note.id }, note).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'Note updated');
            });
        };
        EditorCtrl.prototype.editNote = function (note) {
            this.showNoteToEdit = true;
            this.noteToEdit = note;
        };
        EditorCtrl.prototype.deleteNote = function (note) {
            var _this = this;
            this.eventNotes["delete"]({ noteId: note.id }).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'Note deleted');
                var index = _this.eventToEdit.note.indexOf(note);
                _this.eventToEdit.note.splice(index, 1);
            });
        };
        EditorCtrl.prototype.addNote = function (note, event) {
            var _this = this;
            note.event_id = event.id;
            note.user_id = this.$scope.currentUser.id;
            this.eventNotes.save(note).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'Note added');
                if (_this.eventToEdit) {
                    //add note to note array
                    event.note.push(response);
                }
            });
        };
        EditorCtrl.prototype.submitEvent = function (eventData, note) {
            var _this = this;
            if (eventData) {
                this.addEventData(eventData).then(function (response) {
                    if (note) {
                        _this.addNote(note, response);
                    }
                    _this.uploadHeaderPhoto('event', response.id);
                    _this.$state.reload();
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
                        _this.uploadHeaderPhoto('post', response.id);
                        _this.uploadGalleryPhotos();
                        _this.Toast.makeToast('success', 'Post added');
                        _this.$state.reload();
                    }
                });
            }
        };
        //todo can be one method for all
        EditorCtrl.prototype.uploadHeaderPhoto = function (where, whatId) {
            if (this.$scope.photo) {
                this.Upload.upload({
                    url: this.config.API + 'images/' + where + '/' + whatId + '/' + 1,
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
        '$state',
        'ImageResource',
        '$q',
        '$timeout',
        'EventResource',
        '$filter',
        'EventNotesResource'
    ];
    myApp.EditorCtrl = EditorCtrl;
    angular.module('myApp').controller('myApp.EditorCtrl', EditorCtrl);
})(myApp || (myApp = {}));
