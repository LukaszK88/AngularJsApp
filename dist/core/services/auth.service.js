/**
 * Created by lukas on 20/05/17.
 */
var myApp;
(function (myApp) {
    'use strict';
    var Auth = (function () {
        function Auth($auth, $http, $q) {
            var _this = this;
            this.$auth = $auth;
            this.$http = $http;
            this.$q = $q;
            this.currentUser = function () {
                if (_this.$auth.getToken()) {
                    return _this.$http.get('http://127.0.0.1:8000/api/user');
                }
                else {
                    _this.$q.reject({ message: 'User has no Token' });
                }
            };
            this.updateUser = function (data) {
                if (_this.$auth.getToken()) {
                    return _this.$http.put('http://127.0.0.1:8000/api/fighters/update', data);
                }
                else {
                    _this.$q.reject({ message: 'User has no Token' });
                }
            };
            this.updateUserPassword = function (data) {
                if (_this.$auth.getToken()) {
                    console.log(data);
                    return _this.$http.put('http://127.0.0.1:8000/api/fighters/updatePassword', data);
                }
                else {
                    _this.$q.reject({ message: 'User has no Token' });
                }
            };
        }
        return Auth;
    }());
    Auth.$inject = [
        '$auth',
        '$http',
        '$q'
    ];
    myApp.Auth = Auth;
    angular.module('myApp').service('auth', Auth);
})(myApp || (myApp = {}));
