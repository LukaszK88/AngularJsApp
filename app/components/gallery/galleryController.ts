
module myApp{

    'use-strict';

    export class GalleryCtrl {
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


            this.BlogResource.post.get({ postId:$stateParams['postId']}).$promise.then((response)=>{
                this.post = response;
            });


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
                    transition: 'zoomInOut',
                    caption: false
                },
                panel: {
                    thumbnail: {
                        class: "col-md-3"
                    },
                },
                image: {
                    height: 210,
                    wide: true,
                    transition: 'fadeInOut'
                }
            };


            this.nature1 = [
                {
                    link: "portfolio/fullsize/2.jpg",
                    thumbnail: "portfolio/fullsize/2.jpg",
                    medium: "portfolio/fullsize/2.jpg",
                }, {
                    link : "portfolio/fullsize/1.jpg",
                    thumbnail: "portfolio/fullsize/1.jpg",
                    medium: "portfolio/fullsize/1.jpg",
                }, {
                    link: "portfolio/fullsize/3.jpg",
                    thumbnail: "portfolio/fullsize/3.jpg",
                    medium: "portfolio/fullsize/3.jpg",
                }, {
                    link: "portfolio/fullsize/4.jpg",
                    thumbnail: "portfolio/fullsize/4.jpg",
                    medium: "portfolio/fullsize/4.jpg",
                }, {
                    link: "portfolio/fullsize/5.jpg",
                    thumbnail: "portfolio/fullsize/5.jpg",
                    medium: "portfolio/fullsize/5.jpg",
                }
            ];
        }

        public goBack(){

            this.$state.go("^");

        }





      }

      angular.module('myApp').controller('myApp.GalleryCtrl', GalleryCtrl);
}



