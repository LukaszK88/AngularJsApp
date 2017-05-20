angular.module('myApp')
    .controller('ModalCtrl', function($scope, auth, $location, $auth, $mdDialog, toastService) {



        if($auth.isAuthenticated()){
            auth.currentUser().then(function (data) {
                $scope.user = data.data;
            });
        }

        $scope.user = {};


        var range = [];
        for(var i=16;i<=60;i++) {
            range.push(i);
        }
        $scope.ageArray = range;


        $scope.showEditProfile = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/templates/modals/editprofile.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (data) {
                    auth.updateUser(data).then(function (response){
                        toastService.makeToast('success', response.data.message);
                    });
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                    console.log($s)
                });
        };

        $scope.showUpdateRecord = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/templates/modals/updateRecord.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(data) {
                auth.updateUser(data).then(function(response) {
                    toastService.makeToast('success', response.data.message);
        });
        }, function(){
                $scope.status = 'You cancelled the dialog.';

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