
module myApp{

    'use-strict';

    export class EditorCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                '$stateParams',
                'Upload',
                'toastService',
                '_',
                'PostTypeResource'
            ];

            public postTypes:any = [];

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Toast:any,
                    protected _:any,
                    protected types:any
        ){
            $scope.category = {};
            $scope.files = [];
            $scope.photo = [];

            this.types.query().$promise.then((response:any) => {
                this.postTypes = response;
            });
        }

        public submit(post){
            if(this.$scope.files) {

                console.log(this.$scope.files);
            }
            if(this.$scope.photo) {

                console.log(this.$scope.photo);
            }
            //console.log(photo);
            //console.log(post);
        }

      }

      angular.module('myApp').controller('myApp.EditorCtrl',EditorCtrl);
}



