
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
            news:any = [];
            headers:any = [];
            tournaments:any =[];
            currentState:string;


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
            this.currentState =  $state.current.name;

            if(this.currentState === 'tournaments'){
                this.fetchTournaments();
            }

            this.Image.query({ postId:$stateParams['postId']}).$promise.then((response)=>{
                this.images = response;
            });



            // this.BlogResource.post.query().$promise.then((response)=>{
            //     this.posts = response;
            //
            // });

            this.BlogResource.post.getByType({type:3}).$promise.then((response)=>{
                this.news = response;
            });

            this.BlogResource.post.getByType({type:1}).$promise.then((response)=>{
                this.headers = response;
            });

            if($stateParams['postId']) {
                this.BlogResource.post.get({postId: $stateParams['postId']}).$promise.then((response) => {
                    this.post = response;
                });
            }
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

        protected fetchTournaments(){
            this.BlogResource.post.getByType({type:4}).$promise.then((response)=>{
                this.tournaments = response;
                let now = new Date().getTime();
                this._.forEach(this.tournaments,((value, key) => {
                  //  let countdown = (new Date(value.date).getTime()) - now;
                        //value.date = Math.floor((countdown % (1000 * 60)) / 1000);
                    value.date = ((new Date(value.date).getTime() - now) / 1000);
                }));
                console.log(this.tournaments);
            });
        }

        public goBack(){

            this.$state.go("blog");

        }


      }

      angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
}



