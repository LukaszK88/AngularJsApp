var myApp;
(function (myApp) {
    var MainCtrl = (function () {
        function MainCtrl($scope, $location, $auth, User, Auth, $mdDialog, $rootScope, $timeout, $window, Upload) {
            this.$scope = $scope;
            this.$location = $location;
            this.$auth = $auth;
            this.User = User;
            this.Auth = Auth;
            this.$mdDialog = $mdDialog;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.$window = $window;
            this.Upload = Upload;
            this.checkIfLoggedIn();
        }
        MainCtrl.prototype.upload = function (file) {
            this.Upload.upload({
                url: 'http://127.0.0.1:8000/api/storePhoto/' + this.$scope.currentUser.id,
                data: {
                    file: file
                }
            }).then(function (response) {
                console.log(response);
            });
        };
        MainCtrl.prototype.checkIfLoggedIn = function () {
            var _this = this;
            if (this.$auth.isAuthenticated()) {
                this.Auth.currentUser().then(function (data) {
                    _this.$scope.currentUser = data.data;
                    var fb = data.data.facebook_picture;
                    var google = data.data.google_picture;
                    if (fb) {
                        _this.$scope.image = fb;
                    }
                    else if (google) {
                        _this.$scope.image = google;
                    }
                    else {
                        _this.$scope.image = _this.$location.$$protocol + '://' + _this.$location.$$host + '/img/profile_placeholder.png';
                    }
                });
            }
            else {
                this.$scope.currentUser = '';
            }
        };
        MainCtrl.prototype.logout = function () {
            var _this = this;
            this.$auth.logout();
            this.$timeout(function () {
                _this.$location.path('/');
                _this.$window.location.reload();
            }, 2000);
            this.User.toast('error', 'You are being logged out, redirecting...');
        };
        MainCtrl.prototype.login = function (user) {
            var _this = this;
            this.$auth.login(user)
                .then(function (data) {
                _this.$timeout(function () {
                    _this.$location.path('/');
                    _this.$window.location.reload();
                }, 2000);
                _this.User.toast('success', data.data.message);
            })["catch"](function (error) {
                _this.User.toast('error', error.data.error);
            });
        };
        MainCtrl.prototype.authenticate = function (provider) {
            var _this = this;
            this.$auth.authenticate(provider).then(function (response) {
                _this.$timeout(function () {
                    _this.$location.path('/');
                    _this.$window.location.reload();
                }, 2000);
                _this.User.toast('success', response.data.message);
            })["catch"](function (response) {
                _this.User.toast('error', 'Something went wrong');
            });
        };
        return MainCtrl;
    }());
    MainCtrl.$inject = [
        '$scope',
        '$location',
        '$auth',
        'User',
        'Auth',
        '$mdDialog',
        '$rootScope',
        '$timeout',
        '$window',
        'Upload'
    ];
    myApp.MainCtrl = MainCtrl;
    angular.module('myApp').controller('myApp.MainCtrl', MainCtrl);
})(myApp || (myApp = {}));
// angular.module('myApp').
//     controller('mainCtrl', function (Auth,$auth, User, $mdDialog , $http, $location, $rootScope, $routeParams, $scope, $timeout, $window) {
//             $rootScope.$on('$routeChangeStart', function () {
//                 if($auth.isAuthenticated()){
//                     Auth.currentUser().then(function (data) {
//                         $scope.currentUser = data.data;
//                         var fb = data.data.facebook_picture;
//                         var google =data.data.google_picture;
//                         if (fb){
//                             $scope.image = fb
//                         }else if (google){
//                             $scope.image = google
//                         }else {
//                             $scope.image = $location.$$protocol + '://' + $location.$$host+'/img/profile_placeholder.png'
//                         }
//                     });
//                 }else{
//                         $scope.currentUser = '';
//                 }
//             });
//             if($auth.isAuthenticated()){
//                 Auth.currentUser().then(function (data) {
//                 });
//             }
// $scope.kaka = 'test';
//         $scope.logout = function () {
//                 $auth.logout();
//                 $timeout(function () {
//                     $location.path('/');
//                     $window.location.reload();
//                 },2000);
//             User.toast('error', 'You are being logged out, redirecting...');
//             };
//                 $scope.login = function(user) {
//                     $auth.login(user)
//                         .then(function(data) {
//                             $location.path('/');
//                             User.toast('success', data.data.message);
//                         })
//                         .catch(function(error) {
//                             User.toast('error', error.data.error);
//                         });
//                 };
//                 $scope.authenticate = function(provider) {
//                     $auth.authenticate(provider).then(function(response) {
//                         $timeout(function () {
//                             $location.path('/');
//                             $window.location.reload();
//                         },2000);
//                         User.toast('success',response.data.message);
//                     }).catch(function(response) {
//                         User.toast('error', 'Something went wrong');
//                     });
//                 };
// });
