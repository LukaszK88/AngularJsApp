module myApp{

    export class MainCtrl {
            static $inject=[
                '$scope',
                '$location',
                '$auth',
                'toastService',
                'auth',
                '$mdDialog',
                '$rootScope',
                '$timeout',
                '$window',
                'Upload'
        ];

        constructor(public $scope:any,
                    public $location:any,
                    public $auth:any,
                    public Toast:any,
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

                        if(data.data.role === 2){
                            console.log(data.data.role);
                            this.$scope.admin = true;
                        }

                        var fb = data.data.facebook_picture;
                        var google =data.data.google_picture;
                        if(data.data.image){
                            this.$scope.image = data.data.image
                        }else {
                            if (fb) {
                                this.$scope.image = fb
                            } else if (google) {
                                this.$scope.image = google
                            } else {
                                this.$scope.image = this.$location.$$protocol + '://' + this.$location.$$host + '/img/profile_placeholder.png'
                            }
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
            this.Toast.makeToast('error', 'You are being logged out, redirecting...');
        }

        public login(user){
            this.$auth.login(user)
                        .then((data) => {
                            this.$timeout(() => {
                                this.$location.path('/');
                                this.$window.location.reload();
                            },2000);
                            this.Toast.makeToast('success', data.data.message);
                        })
                        .catch((error) => {
                            this.Toast.makeToast('error', error.data.error);
                        });
        }

        public authenticate(provider){
             this.$auth.authenticate(provider).then((response) => {
                        this.$timeout(() => {
                            this.$location.path('/');
                            this.$window.location.reload();
                        },2000);
                 this.Toast.makeToast('success',response.data.message);
                    }).catch((response) => {
                 this.Toast.makeToast('error', 'Something went wrong');
                    });
        }






    }

    angular.module('myApp').controller('myApp.MainCtrl',MainCtrl);
}
