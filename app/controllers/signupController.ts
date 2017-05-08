
module myApp{

   export class SignupCtrl implements ISignupCtrl {

        static $inject=[
                '$scope',
                '$location',
                '$auth',
                'User'
        ];

        constructor(public $scope:ng.IScope,
                    public $location:any,
                    public $auth:any,
                    public User:any
                    ){


                    }


             public signup(user){
                    this.$auth.signup(user)
                .then((response) => {
                  this.$auth.setToken(response.data.token)

                    this.$location.path('/');
                    this.User.toast('success', response.data.message);
                })
                .catch((response) => {

                   this.User.toast('error', response.data.error.email[0]);
                    
                });
             } 
    }
    
  angular.module('myApp').controller('myApp.SignupCtrl',SignupCtrl);

}









   