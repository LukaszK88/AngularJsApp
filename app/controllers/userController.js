angular.module('myApp')
    .controller('UserCtrl', function($scope, Auth, $location, $auth, $mdDialog, $mdToast, User) {



        if($auth.isAuthenticated()){
            Auth.currentUser().then(function (data) {
                $scope.user = data.data;
            });
        }

        $scope.user = {};


        var range = [];
        for(var i=16;i<=60;i++) {
            range.push(i);
        }
        $scope.ageArray = range;


        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/templates/modals/editprofile.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (data) {
                    Auth.updateUser(data).then(function (response){
                        User.toast('success', response.data.message);
                    });
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                    console.log($s)
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.submit = function (data) {
                $mdDialog.hide(data);
            };
        }
    });