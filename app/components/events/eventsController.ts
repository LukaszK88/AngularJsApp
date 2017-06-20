
module myApp{

    'use-strict';

    export class EventCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'BlogResource',
                '$stateParams',
                'ImageResource',
                'toastService',
                '$state',
                '_',
                'EventResource'
            ];


            tournaments:any = [];
            currentState:string;


        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected BlogResource:any,
                        protected $stateParams:any,
                    protected Image:any,
                    protected Toast:any,
                    protected $state:any,
                    protected _:any,
                    protected event:any
        ){

            this.currentState =  $state.current.name;

            if(this.currentState === 'tournaments'){
                this.fetchTournaments();
            }

            // this.Image.query({ postId:$stateParams['postId']}).$promise.then((response)=>{
            //     this.images = response;
            // });
            //
            //
            // if($stateParams['postId']) {
            //     this.BlogResource.post.get({postId: $stateParams['postId']}).$promise.then((response) => {
            //         this.post = response;
            //     });
            // }

        }

        protected fetchTournaments(){
            this.event.getByType({typeId:1}).$promise.then((response)=>{
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


      }

      angular.module('myApp').controller('myApp.EventCtrl', EventCtrl);
}



