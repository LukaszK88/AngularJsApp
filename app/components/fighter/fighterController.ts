
module myApp{

    'use-strict';

    export class FighterCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'FighterResource',
                '$stateParams',
                'Upload'
            ];

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any,
                        public Upload:any
        ){



            this.FighterResource.get({fighterId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                    $scope.fighter = response.fighters;
                });
        }

        public fighterLoggedIn(currentUser:any){
            if(currentUser) {
                if (this.$stateParams['fighterId'] = currentUser.id) {
                    return true;
                }
            }
        }
      }

      angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
}



