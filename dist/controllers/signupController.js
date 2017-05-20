var myApp;
(function (myApp) {
    var SignupCtrl = (function () {
        function SignupCtrl($scope, $location, $auth, Toast) {
            this.$scope = $scope;
            this.$location = $location;
            this.$auth = $auth;
            this.Toast = Toast;
        }
        SignupCtrl.prototype.signup = function (user) {
            var _this = this;
            this.$auth.signup(user)
                .then(function (response) {
                _this.$auth.setToken(response.data.token);
                _this.$location.path('/');
                _this.Toast.makeToast('success', response.data.message);
            })["catch"](function (response) {
                _this.Toast.makeToast('error', response.data.error.email[0]);
            });
        };
        return SignupCtrl;
    }());
    SignupCtrl.$inject = [
        '$scope',
        '$location',
        '$auth',
        'toastService'
    ];
    myApp.SignupCtrl = SignupCtrl;
    angular.module('myApp').controller('myApp.SignupCtrl', SignupCtrl);
})(myApp || (myApp = {}));
