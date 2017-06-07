
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
                    protected Achievement:any,
                    protected Toast:any,
                    protected $state:any,
                    protected _:any
        ){
            $scope.methods = {};


            this.BlogResource.post.query().$promise.then((response)=>{
                this.posts = response;
            });

            this.BlogResource.post.get({ postId:$stateParams['postId']}).$promise.then((response)=>{
                this.post = response;
            });

            this.images = [
                {
                    id : 3,
                    //thumbUrl : 'http://ranking.com/img/portfolio/fullsize/1.jpg',
                    url : 'http://ranking.com/img/portfolio/fullsize/1.jpg'
                },
                {
                    id : 4,
                    //thumbUrl : 'http://ranking.com/img/portfolio/fullsize/2.jpg',
                    url : 'http://ranking.com/img/portfolio/fullsize/2.jpg'
                }

            ];

            this.showModal = false;
            this.nature1Options = {
                baseUrl: "http://ranking.com/img/",
                fields: {
                    source: {
                        modal: "link",
                        image: "medium",
                        panel: "thumbnail"
                    }
                },
                modal: {
                    wide: true,
                    transition: 'zoomInOut'
                },
                panel: {
                    thumbnail: {
                        class: "col-md-4"
                    },
                },
                image: {
                    transition: 'fadeInOut'
                }
            };


            this.nature1 = [
                {
                    "link": "portfolio/fullsize/2.jpg",
                    "thumbnail": "portfolio/fullsize/2.jpg",
                    "medium": "portfolio/fullsize/2.jpg",
                }, {
                    "link": "portfolio/fullsize/1.jpg",
                    "thumbnail": "portfolio/fullsize/1.jpg",
                    "medium": "portfolio/fullsize/1.jpg",
                }
            ];
        }

        public goBack(){

            this.$state.go("blog");

        }

        public readMore(postId){

            this.textLimit = 10000;
        }




      }

      angular.module('myApp').controller('myApp.BlogCtrl', BlogCtrl);
}



