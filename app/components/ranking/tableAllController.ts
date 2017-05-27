
module myApp.ranking{

    'use-strict';

    export class TableAllController {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'FighterResource',
                '$stateParams'
            ];

            public path:string;


            constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any
            ){

                $scope.selectedIndex = 0;

                $scope.$watch('selectedIndex', (current, old) => {
                    if(current){
                        this.$scope.total = false;
                        this.$scope.bohurt = false;
                        this.$scope.profight = false;
                        this.$scope.swordShield = false;
                        this.$scope.longsword = false;
                        this.$scope.swordBuckler = false;
                        this.$scope.polearm = false;
                        this.$scope.triathlon = false;
                    }
                    switch (current) {
                        case 0:
                            this.$scope.total = true;
                            break;
                        case 1:
                            this.$scope.bohurt = true;
                            break;
                        case 2:
                            this.$scope.profight = true;
                            break;
                        case 3:
                            this.$scope.swordShield = true;
                            break;
                        case 4:
                            this.$scope.longsword = true;
                            break;
                        case 5:
                            this.$scope.swordBuckler = true;
                            break;
                        case 6:
                            this.$scope.polearm = true;
                            break;
                        case 7:
                            this.$scope.triathlon = true;
                            break;
                    }
                });

                this.FighterResource.get().$promise
                    .then((response:any) => {
                        $scope.fighters = response.fighters;
                    });




            }
      }

      angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
}



