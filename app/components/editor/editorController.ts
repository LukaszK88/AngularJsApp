
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
                '$state'
            ];

            public postTypes:any = [];
            postId:string;
            activeTab:number;
            posts:any = [];
            postToEdit:any = [];
            postEdit:boolean = false;


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
                    protected $state:any
        ){
            //$scope.category = config.editorsDefault.categories;

            $scope.files = [];
            $scope.photo = [];


            this.types.query().$promise.then((response:any) => {
                this.postTypes = response;
            });

            $scope.$watch('active',(newVal) => {
                if(newVal === 1){
                    this.activeTab = 1;
                }else if(newVal === 2){
                    this.activeTab = 2;
                }else{
                    this.activeTab = 0;
                }
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
                        this.uploadHeaderPhoto();
                        this.uploadGalleryPhotos();
                        this.Toast.makeToast('success','Post added');
                        this.$state.reload();
                    }
                });
            }

        }

        private uploadHeaderPhoto(){
            if (this.$scope.photo) {

            this.Upload.upload({
                url: this.config.API + 'images/post/' + this.postId + '/' + 1,
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



