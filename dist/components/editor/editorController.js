var myApp;
(function (myApp) {
    'use-strict';
    var EditorCtrl = (function () {
        function EditorCtrl($http, $scope, $location, $stateParams, Upload, Toast, _, types) {
            var _this = this;
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.$stateParams = $stateParams;
            this.Upload = Upload;
            this.Toast = Toast;
            this._ = _;
            this.types = types;
            this.postTypes = [];
            $scope.category = {};
            $scope.files = [];
            $scope.photo = [];
            this.types.query().$promise.then(function (response) {
                _this.postTypes = response;
            });
        }
        EditorCtrl.prototype.submit = function (post) {
            if (this.$scope.files) {
                console.log(this.$scope.files);
            }
            if (this.$scope.photo) {
                console.log(this.$scope.photo);
            }
            //console.log(photo);
            //console.log(post);
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
        'PostTypeResource'
    ];
    myApp.EditorCtrl = EditorCtrl;
    angular.module('myApp').controller('myApp.EditorCtrl', EditorCtrl);
})(myApp || (myApp = {}));
