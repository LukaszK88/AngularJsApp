
module myApp{

    'use-strict';

    export class FighterCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'FighterResource',
                '$stateParams',
                'Upload',
                'AchievementResource',
                'toastService'
            ];


        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Achievement:any,
                    protected Toast:any
        ){



            this.FighterResource.get({fighterId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                    $scope.fighter = response.fighters;
                });

            this.Achievement.get({userId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                    $scope.achievements = response.data.data;
                    $scope.stats = response.data.achievement;


                });
        }

        public fighterLoggedIn(){
            if(this.$scope.currentUser) {
                if (this.$stateParams['fighterId'] == this.$scope.currentUser.id) {
                    return true;
                }
            }
        }

        public deleteAchievement(id:number){
            this.Achievement.deleteThis({userId:this.$stateParams['fighterId'], achievementId:id}).$promise
                .then((response:any) => {
                    this.Toast.makeToast('error',response.message);
                });
        }

      }

      angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
}



