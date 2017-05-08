var myApp;
(function (myApp) {
    var SignupCtrl = (function () {
        function SignupCtrl($scope, $location, $auth, User) {
            this.$scope = $scope;
            this.$location = $location;
            this.$auth = $auth;
            this.User = User;
        }
        SignupCtrl.prototype.signup = function (user) {
            var _this = this;
            this.$auth.signup(user)
                .then(function (response) {
                _this.$auth.setToken(response.data.token);
                _this.$location.path('/');
                _this.User.toast('success', response.data.message);
            })["catch"](function (response) {
                _this.User.toast('error', response.data.error.email[0]);
            });
        };
        return SignupCtrl;
    }());
    SignupCtrl.$inject = [
        '$scope',
        '$location',
        '$auth',
        'User'
    ];
    myApp.SignupCtrl = SignupCtrl;
    angular.module('myApp').controller('myApp.SignupCtrl', SignupCtrl);
})(myApp || (myApp = {}));
