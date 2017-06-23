var myApp;
(function (myApp) {
    'use-strict';
    var EventCtrl = (function () {
        function EventCtrl($http, $scope, $location, BlogResource, $stateParams, Image, Toast, $state, _, event) {
            this.$http = $http;
            this.$scope = $scope;
            this.$location = $location;
            this.BlogResource = BlogResource;
            this.$stateParams = $stateParams;
            this.Image = Image;
            this.Toast = Toast;
            this.$state = $state;
            this._ = _;
            this.event = event;
            this.tournaments = [];
            this.tournament = [];
            this.attendees = [];
            this.currentState = $state.current.name;
            if (this.currentState === 'tournaments') {
                this.fetchTournaments();
            }
            if (this.currentState === 'tournament') {
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
        EventCtrl.prototype.fetchAttendees = function () {
            var _this = this;
            this.event.attendees({ eventId: this.$stateParams['tournamentId'] }).$promise.then(function (response) {
                _this.attendees = response;
                console.log(_this.attendees);
            });
        };
        EventCtrl.prototype.fetchTournament = function () {
            var _this = this;
            console.log('test');
            this.event.get({ eventId: this.$stateParams['tournamentId'] }).$promise.then(function (response) {
                _this.tournament = response;
                _this.attendingCount = response.attendance.length;
            });
        };
        EventCtrl.prototype.submitAttendanceCategories = function (categories) {
            this.event.attendCategories({ eventAttendId: this.$stateParams['eventAttendId'] }, categories).$promise.then(function (response) {
            });
        };
        EventCtrl.prototype.attend = function (user, event) {
            var _this = this;
            var status = {};
            status['going'] = true;
            this.event.attend({ eventId: event.id, userId: user.id }, status).$promise.then(function (response) {
                _this.Toast.makeToast('success', 'You are going to ' + event.title);
                _this.$state.go('tournaments', { eventAttendId: response.id });
            });
        };
        EventCtrl.prototype.cantGo = function (user, event) {
            var _this = this;
            var status = {};
            status['going'] = false;
            this.event.attend({ eventId: event.id, userId: user.id }, status).$promise.then(function (response) {
                _this.Toast.makeToast('error', 'You are not going to ' + event.title);
            });
        };
        EventCtrl.prototype.fetchTournaments = function () {
            var _this = this;
            this.event.getByType({ typeId: 1 }).$promise.then(function (response) {
                _this.tournaments = response;
                var now = new Date().getTime();
                _this._.forEach(_this.tournaments, (function (value, key) {
                    //  let countdown = (new Date(value.date).getTime()) - now;
                    //value.date = Math.floor((countdown % (1000 * 60)) / 1000);
                    value.date = ((new Date(value.date).getTime() - now) / 1000);
                }));
                console.log(_this.tournaments);
            });
        };
        return EventCtrl;
    }());
    EventCtrl.$inject = [
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
    myApp.EventCtrl = EventCtrl;
    angular.module('myApp').controller('myApp.EventCtrl', EventCtrl);
})(myApp || (myApp = {}));
