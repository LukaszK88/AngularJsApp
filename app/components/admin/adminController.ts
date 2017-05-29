
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



        }


      }

      angular.module('myApp').controller('myApp.AdminCtrl', AdminCtrl);
}



