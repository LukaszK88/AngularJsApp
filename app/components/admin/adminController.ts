
module myApp{

    'use-strict';

    export class AdminCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'FighterResource',
                '$stateParams',
                'Upload',
                'AchievementResource',
                'toastService',
                'UserResource',
                '_'
            ];

            public unUsers:any = [];
        public blockedUsers:any = [];
        protected placeholder:string;

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Achievement:any,
                    protected Toast:any,
                    protected User:any,
                    protected _:any
        ){
            this.placeholder = this.$location.$$protocol + '://' + this.$location.$$host + '/img/profile_placeholder.png';

            this.fetchBlockedUsers();
            this.fetchUnautorizedUsers()




        }

        protected fetchUnautorizedUsers(){
            this.User.admin.getUnauthorized({action:'unauthorized'}).$promise.then((response) => {
                this.unUsers = response;
            });
        }

        protected fetchBlockedUsers(){
            this.User.admin.getBlocked({action:'blocked'}).$promise.then((response) => {
                this.blockedUsers = response;
            });
        }

        public approveUser(user){
            this.User.admin.approve({userId:user.id, action:'approve'}).$promise.then((response:any) => {

                if(this._.find(this.unUsers,user)){
                    let index=this.unUsers.indexOf(user);
                    this.unUsers.splice(index,1);
                }
                if(this._.find(this.blockedUsers,user)){
                    let index=this.blockedUsers.indexOf(user);
                     this.blockedUsers.splice(index,1);
                }
                this.Toast.makeToast('success',response.message);
            });
        }

        public removeUser(user){
            this.User.admin.remove({userId:user.id, action:'remove'}).$promise.then((response:any) => {
                let index=this.unUsers.indexOf(user);
                if(this._.find(this.unUsers,user)){
                    let index=this.unUsers.indexOf(user);
                    this.unUsers.splice(index,1);
                }
                if(this._.find(this.blockedUsers,user)){
                    let index=this.blockedUsers.indexOf(user);
                    this.blockedUsers.splice(index,1);
                }
                this.Toast.makeToast('error',response.message);
            });
        }

        public blockUser(user){
            this.User.admin.block({userId:user.id, action:'block'}).$promise.then((response:any) => {
                let index=this.unUsers.indexOf(user);
                this.unUsers.splice(index,1);
                this.fetchBlockedUsers();
                this.Toast.makeToast('error',response.message);
            });
        }


      }

      angular.module('myApp').controller('myApp.AdminCtrl', AdminCtrl);
}



