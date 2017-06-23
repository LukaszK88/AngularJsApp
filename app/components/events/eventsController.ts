
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
            eventAttendId:number;
            tournament:any = [];
            attendingCount:number;
            attendees:any =[];


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
            if(this.currentState === 'tournament'){
                this.fetchTournament();
                this.fetchAttendees();
            }

//fetch categories for modal
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
        public fetchAttendees(){

            this.event.attendees({eventId:this.$stateParams['tournamentId']}).$promise.then((response) => {
                this.attendees = response;
                console.log(this.attendees);
            });
        }

        public fetchTournament(){
            console.log('test');
            this.event.get({eventId:this.$stateParams['tournamentId']}).$promise.then((response) => {
                this.tournament = response;
                this.attendingCount = response.attendance.length;
            });
        }

        public submitAttendanceCategories(categories){

            this.event.attendCategories({eventAttendId:this.$stateParams['eventAttendId']}, categories).$promise.then((response) => {

            });
        }

        public attend(user, event) {
            let status:any ={};
             status['going'] = true;
            this.event.attend({eventId: event.id, userId: user.id}, status).$promise.then((response) => {

                this.Toast.makeToast('success','You are going to ' + event.title);

                this.$state.go('tournaments',{eventAttendId:response.id});
            });
        }
        public cantGo(user, event){
            let status:any ={};
            status['going'] = false;
            this.event.attend({eventId: event.id, userId: user.id}, status).$promise.then((response) => {
                this.Toast.makeToast('error','You are not going to ' + event.title);
            });
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



