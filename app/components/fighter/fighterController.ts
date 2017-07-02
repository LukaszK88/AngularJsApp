
module myApp{

    'use-strict';

    export class FighterCtrl {
            static $inject =[
                '$http',
                '$scope',
                '$location',
                'FighterResource',
                '$stateParams',
                'Upload',
                'AchievementResource',
                'toastService',
                'EventResource'
            ];


        public achievements:any = [];
        events:any = [];
        eventAttendingCount:number;
        eventNotes:any = [];
        peopleAttending:number;

        eventSelect:any = [];

        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected FighterResource:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Achievement:any,
                    protected Toast:any,
                    protected EventResource:any
        ){
            this.fetchAchievements();
            this.getFighterEvents();
            this.getEvents();

//this.eventNotes = 'test';
//TODO in the future drop down only events which attended only by the user
            $scope.$watch('file',  (newVal,oldVal) => {
                if(newVal) {
                    this.Upload.upload({
                        url: 'http://127.0.0.1:8000/api/storePhoto/' + this.$scope.currentUser.id,
                        data: {
                            file: this.$scope.file
                        }
                    }).then((response: any) => {

                        this.$scope.fighter.image = response.data.imageUrl;
                        this.Toast.makeToast('success',response.data.message);

                    });
                }
            });


            this.FighterResource.get({fighterId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                    $scope.fighter = response.fighters;
                });

        }

        public getEvents(){
            this.EventResource.query().$promise.then((response:any) => {
                this.eventSelect = response;
            });
        }

        public getOtherAttendees(event){
            this.EventResource.attendees({eventId:event.id}).$promise
                .then((response:any) => {
                    event.users = response;
                    this.FighterResource.getFighterEventInfo({eventAttendId:event.eventAttendId,userId:this.$stateParams['fighterId']}).$promise
                        .then((response:any) => {
                            event.attending_categories = response.event_attend_category;
                        });
                });
        }

        public getFighterEvents(){
            this.EventResource.getAttendingEvents({userId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                   this.events = response;
                   this.eventAttendingCount = response.length;
                });
        }

        public hideForm(){
            this.$scope.showform = false;
        }

        public fetchAchievements(){
            this.Achievement.get({userId:this.$stateParams['fighterId']}).$promise
                .then((response:any) => {
                    this.achievements = response.data;

                });
        }

        public updateAchievement(achievement){
            this.Achievement.update({userId: achievement.id}, achievement).$promise.then((response) => {
                this.fetchAchievements();
                this.Toast.makeToast('success', 'Achievement updated');
            });
        }


        public addAchievement(data){
            data.user_id = this.$scope.currentUser.id;
            this.Achievement.save(data).$promise.then((response) => {
                console.log(response.data);
                this.achievements.data.push(response.data);
                this.fetchAchievements();
                this.Toast.makeToast('success', response.message);
            });
        }

        public fighterLoggedIn(){
            if(this.$scope.currentUser) {
                if (this.$stateParams['fighterId'] == this.$scope.currentUser.id) {
                    return true;
                }
            }
        }

        public deleteAchievement(achievement:any){
            this.Achievement.deleteThis({userId:this.$stateParams['fighterId'], achievementId:achievement.id}).$promise
                .then((response:any) => {
                   let index=this.achievements.data.indexOf(achievement);
                    this.achievements.data.splice(index,1);
                    this.fetchAchievements();
                    this.Toast.makeToast('error',response.message);
                });
        }

      }

      angular.module('myApp').controller('myApp.FighterCtrl', FighterCtrl);
}



