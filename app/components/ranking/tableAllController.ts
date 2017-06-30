
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
        leaderboard:any = [];
        newLeaderboard:any = [];

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any
            ){

                $scope.selectedIndex = 0;
            this.getLeaderboardData();
               $scope.$watch('selectedIndex', (current, old) => {

                    switch (current) {
                        case 0:
                            this.$scope.total = true;
                            break;
                        case 1:

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

            public getLeaderboardData(){
                this.FighterResource.getLeaderboardData().$promise
                    .then((response:any) => {

                        this.leaderboard = response;

                        angular.forEach(this.leaderboard,(value,key) => {

                            this.leaderboard[key.replace('_',' ')] = value;

                        });
                        delete this.leaderboard['sword_shield'];
                        delete this.leaderboard['sword_buckler'];
                    });
            }

            public getSum(category,column){
                let total = 0;
                for (var y in category) {
                    total += category[y][column];
                }
                return total;
            }
        }

    angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
}



