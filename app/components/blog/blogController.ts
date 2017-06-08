
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
                'ImageResource',
                'toastService',
                '$state',
                '_'
            ];

            protected posts:any = [];
            post:any = [];
            images:any = [];
            nature1:any = [];
            showModal:boolean = false;
            nature1Options:any = [];
            //protected textLimit:number = 150;

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected BlogResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Image:any,
                    protected Toast:any,
                    protected $state:any,
                    protected _:any
        ){
            $scope.methods = {};


            this.BlogResource.post.query().$promise.then((response)=>{

                this.posts = response;
            });

            this.BlogResource.post.get({ postId:$stateParams['postId']}).$promise.then((response)=>{
                console.log(response);
                this.post = response;
            });

            $scope.conf = {
                thumbnails 	: 	true,
                thumbSize		: 	150,
                inline		: 	false,
                bubbles		: 	true,
                bubbleSize		: 	50,
                imgBubbles 	: 	true,
                bgClose		: 	false,
                imgAnim 		: 	'fadeup'
            };

            $scope.openGallery = () =>{
                $scope.methods.open();

            };
            // Similar to above function
            $scope.closeGallery = () =>{
                $scope.methods.close();

            };

            $scope.nextImg = () =>{
                $scope.methods.next();
            };

            $scope.prevImg = () =>{
                $scope.methods.prev();
            };


        }

        public goBack(){

            this.$state.go("blog");

        }


      }

      angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
}



