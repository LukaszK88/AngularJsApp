module myApp{

    export class MainCtrl {
            static $inject=[
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

        constructor(public $scope:any,
                    public $location:any,
                    public $auth:any,
                    public User:any,
                    public Auth:any,
                    public $mdDialog:any,
                    public $rootScope:any,
                    public $timeout:any,
                    public $window:any,
                    public Upload:any
                    ){

            this.checkIfLoggedIn();

                
                   

        }

        public upload(file){
            this.Upload.upload({
                                url: 'http://127.0.0.1:8000/api/storePhoto/'+ this.$scope.currentUser.id,
                                data: {
                                    file:file
                                }
                            }).then((response) => {
                                console.log(response)
                            });
        }

        

        public checkIfLoggedIn(){
            if(this.$auth.isAuthenticated()){
                    this.Auth.currentUser().then((data) => {
                        this.$scope.currentUser = data.data;

                        var fb = data.data.facebook_picture;
                        var google =data.data.google_picture;
                        if (fb){
                            this.$scope.image = fb
                        }else if (google){
                            this.$scope.image = google
                        }else {
                            this.$scope.image = this.$location.$$protocol + '://' + this.$location.$$host+'/img/profile_placeholder.png'

                        }

                    });
                }else{
                        this.$scope.currentUser = '';
                }
        }

        public logout(){
             this.$auth.logout();
                this.$timeout(() => {
                    this.$location.path('/');
                    this.$window.location.reload();
                },2000);
            this.User.toast('error', 'You are being logged out, redirecting...');
        }

        public login(user){
            this.$auth.login(user)
                        .then((data) => {
                            this.$timeout(() => {
                                this.$location.path('/');
                                this.$window.location.reload();
                            },2000);
                            this.User.toast('success', data.data.message);
                        })
                        .catch((error) => {
                            this.User.toast('error', error.data.error);
                        });
        }

        public authenticate(provider){
             this.$auth.authenticate(provider).then((response) => {
                        this.$timeout(() => {
                            this.$location.path('/');
                            this.$window.location.reload();
                        },2000);
                        this.User.toast('success',response.data.message);
                    }).catch((response) => {
                        this.User.toast('error', 'Something went wrong');
                    });
        }






    }

    angular.module('myApp').controller('myApp.MainCtrl',MainCtrl);
}







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
