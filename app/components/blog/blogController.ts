
module myApp{

    'use-strict';

    export class BlogCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'BlogResource',
                '$stateParams',
                'Upload',
                'AchievementResource',
                'toastService',
                'UserResource',
                '_'
            ];

            protected posts:any = [];

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected BlogResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Achievement:any,
                    protected Toast:any,
                    protected User:any,
                    protected _:any
        ){
            this.BlogResource.post.get().$promise.then((response)=>{
                this.posts = response;
            })

        }


      }

      angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
}



