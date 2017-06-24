
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
                'PostTypeResource',
                'BlogResource',
                'config',
                '$state',
                'ImageResource',
                '$q',
                '$timeout',
                'EventResource',
                '$filter',
                'EventNotesResource'
            ];

            postTypes:any = [];
            eventTypes:any = [];
            postId:string;
            activeTab:number;
            posts:any = [];
            postToEdit:any = [];
            postEdit:boolean = false;
            galleries:any = [];
            galleryEdit:boolean = false;
            galleryToEdit:any = [];
            uploadMore:boolean = false;
            categories:any = [];
            addCategories:boolean;
            eventEdit:boolean;
            eventToEdit:any = [];
            events:any =[];
            showNote:boolean;
            showNotesTable:boolean;
            showNoteToEdit:boolean;
            noteToEdit:any = [];


        constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any,
                        protected $stateParams:any,
                        public Upload:any,
                    protected Toast:any,
                    protected _:any,
                    protected types:any,
                    protected blog:any,
                    protected config:any,
                    protected $state:any,
                    protected image:any,
                    protected $q:any,
                    protected $timeout:any,
                    protected eventResource:any,
                    protected $filter:any,
                    protected eventNotes:any
        ){
            //$scope.category = config.editorsDefault.categories;

            $scope.files = [];
            $scope.photo = [];


            $scope.selected = {};

            this.types.query().$promise.then((response:any) => {
                this.postTypes = response;
            });

            $scope.$watch('active',(newVal) => {
                if(newVal === 1){
                    this.activeTab = 1;
                }else if(newVal === 2){
                    this.activeTab = 2;
                }else if(newVal === 3){
                    this.activeTab = 3;
                    this.fetchGalleries()
                }else if(newVal === 4){
                    this.activeTab = 4;
                  this.eventResource.getTypes().$promise.then((response:any) => {
                      this.eventTypes = response;
                  });
                }else if(newVal === 5){
                    this.activeTab = 5;
                    this.eventResource.getTypes().$promise.then((response:any) => {
                        this.eventTypes = response;
                    });
                    this.fetchEvents();

                } else{
                    this.activeTab = 0;
                }
            });

            $scope.date = {
                opened: false
            };

            $scope.dateOptions = {

            };

            $scope.format = 'dd-MMMM-yyyy';

            $scope.date = () => {
                $scope.date.opened = true;
            };
        }

        public fetchEvents(){
            this.eventResource.query().$promise.then((response:any) => {
                this.events = response;
            });
        }

        public uploadMoreImages(gallery){
            this.postId = gallery.id;
            this.uploadGalleryPhotos();

                this.uploadMore = false;
                //fetch single gallery and clear selected photos
                this.$scope.files = [];
                //need to ait for upload
            this.$timeout(() => {
                this.blog.post.get({postId:this.postId}).$promise.then((response:any) => {
                    this.Toast.makeToast('success','Photos Uploaded');
                    this.galleryToEdit = response;
                });
            },1500);
        }

        public deleteGallery(gallery){
            this.image.deleteGallery({postId:gallery.id}).$promise.then((response:any) => {
                this.Toast.makeToast('error','Gallery deleted');
                 let index=this.galleries.indexOf(gallery);
                 this.galleries.splice(index,1);
            });
        }

        public deleteImg(img){
            this.image.delete({postId:img.id}).$promise.then((response:any) => {
                this.Toast.makeToast('error','Photo deleted');
                let index=this.galleryToEdit.image.indexOf(img);
                this.galleryToEdit.image.splice(index,1);
            });
        }

        public deleteEvent(event){
            this.eventResource.delete({eventId:event.id}).$promise.then((response:any) => {
                this.Toast.makeToast('error','Event deleted');
                let index=this.events.indexOf(event);
                this.events.splice(index,1);
            });
        }

        public updateEvent(eventToEdit){
            eventToEdit.categories = this.$scope.selected;

            this.eventResource.update({eventId:eventToEdit.id}, eventToEdit).$promise.then((response:any) => {
//TODO flexible method
                if (this.$scope.photo) {

                    this.Upload.upload({
                        url: this.config.API + 'images/event/' + eventToEdit.id + '/' + 1,
                        data: {
                            file: this.$scope.photo
                        }
                    });
                }

                this.Toast.makeToast('success', 'Event updated');
                this.$state.reload();
            });
        }

        public editEvent(event){

            let array:any = {};
            angular.forEach(event.category, function(value, key) {
                array[value.name] = true;
            });

            this.$scope.selected = array;
            this.eventEdit = true;
            this.eventToEdit = event;

        }

        public editGallery(gallery){
            this.galleryEdit = true;
            this.galleryToEdit = gallery;
        }

        public fetchGalleries(){
            this.image.query().$promise.then((response:any) => {
                this.galleries = response;
            });
        }

        public update(post){
            if(post){
                post.post_type = this.post.post_type;
                this.blog.post.update({postId:post.id},post).$promise.then((response:any) => {
                    this.Toast.makeToast('success','Post updated');
                    this.postEdit = false;
                    this.post.post_type = post.post_type;
                    this.fetchPosts(post.post_type);
                });
            }
        }

        public editPost(post){
            this.postEdit = true;
            this.postToEdit = post;
        }

        public deletePost(post){
            this.blog.post.delete({postId:post.id}).$promise.then((response:any) => {
                this.Toast.makeToast('error','Post deleted');
                let index=this.posts.indexOf(post);
                this.posts.splice(index,1);
            });
        }

        public fetchPosts(type){
            if(this.activeTab === 2) {
                this.blog.post.getByType({type: type}).$promise.then((response: any) => {
                    this.posts = response;
                });
            }
        }


        public addEventData(eventData){
            eventData.date = this.$filter('date')(eventData.date, 'yyyy-MM-dd');
            eventData.user_id = this.$scope.currentUser.id;
            //add categories
            eventData.categories = this.$scope.selected;
            return this.eventResource.save(eventData).$promise.then((response:any) => {
                this.Toast.makeToast('success','Event added');
                return response;
            });
        }

        public updateNote(note){
            this.eventNotes.update({noteId:note.id}, note).$promise.then((response:any) => {
                this.Toast.makeToast('success','Note updated');
            });
        }

        public editNote(note){
            this.showNoteToEdit = true;
            this.noteToEdit = note;
        }

        public deleteNote(note){
            this.eventNotes.delete({noteId:note.id}).$promise.then((response:any) => {
                this.Toast.makeToast('error','Note deleted');
                let index=this.eventToEdit.note.indexOf(note);
                this.eventToEdit.note.splice(index,1);
            });
        }

        public addNote(note,event){
            note.event_id = event.id;
            note.user_id = this.$scope.currentUser.id;
            this.eventNotes.save(note).$promise.then((response:any) => {
                this.Toast.makeToast('success','Note added');
                if(this.eventToEdit){
                    //add note to note array
                    event.note.push(response);
                }
            });
        }

        public submitEvent(eventData, note){
            if(eventData){
                this.addEventData(eventData).then((response)=>{
                    if(note){
                        this.addNote(note,response);
                    }
                    this.uploadHeaderPhoto('event',response.id);
                    this.$state.reload();
                });
            }
        }


        public submit(post){
            if(post){
                post.user_id = this.$scope.currentUser.id;
                if(this.activeTab === 1){
                    post.gallery = 1;
                    post.post_type = 2;
                }

                this.blog.post.save(post).$promise.then((response:any) => {
                    this.postId = response.id;
                    if(this.activeTab === 1){
                        this.uploadGalleryPhotos();
                        this.Toast.makeToast('success','Gallery added');
                        this.$state.reload();
                    }else {
                        this.uploadHeaderPhoto('post',response.id);
                        this.uploadGalleryPhotos();
                        this.Toast.makeToast('success','Post added');
                        this.$state.reload();
                    }
                });
            }

        }
//todo can be one method for all
        private uploadHeaderPhoto(where,whatId){
            if (this.$scope.photo) {
                this.Upload.upload({
                    url: this.config.API + 'images/'+ where +'/' + whatId + '/' + 1,
                    data: {
                        file: this.$scope.photo
                    }
                });
            }
        }

        private uploadGalleryPhotos() {
            if (this.$scope.files) {
                this._.forEach(this.$scope.files['photos'], ((value, key) => {
                    this.Upload.upload({
                        url: this.config.API + 'images/post/' + this.postId + '/' + 2,
                        data: {
                            file: value
                        }
                    })
                }));
            }
        }

    }

    angular.module('myApp').controller('myApp.EditorCtrl',EditorCtrl);
}



