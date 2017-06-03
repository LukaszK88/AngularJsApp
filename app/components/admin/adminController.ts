
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
                'UserResource'
            ];


        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Achievement:any,
                    protected Toast:any,
                    protected User:any,
        ){
            this.$scope.placeholder = this.$location.$$protocol + '://' + this.$location.$$host + '/img/profile_placeholder.png';

            this.User.getUnauthorized().$promise.then((response) => {
                this.$scope.unUsers = response;
            });
        }


      }

      angular.module('myApp').controller('myApp.AdminCtrl', AdminCtrl);
}



