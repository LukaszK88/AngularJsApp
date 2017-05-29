/**
 * Created by lukas on 20/05/17.
 */
module myApp {
    'use strict';

    export class Auth {

        public static $inject = [
            '$auth',
            '$http',
            '$q'
        ];

        constructor(
            private $auth:any,
            protected $http:any,
            protected $q:any
        ) {

        }
        public currentUser =  () => {
        if(this.$auth.getToken()){
            return this.$http.get('http://127.0.0.1:8000/api/user');
        }else {
            this.$q.reject({ message: 'User has no Token'});
        }
        };

        public updateUser =  (data) => {
        if(this.$auth.getToken()){
            return this.$http.put('http://127.0.0.1:8000/api/fighters/update', data);
        }else {
            this.$q.reject({ message: 'User has no Token'});
        }
        };

        public updateUserPassword =  (data) => {
            if(this.$auth.getToken()){
                console.log(data);
                return this.$http.put('http://127.0.0.1:8000/api/fighters/updatePassword', data);
            }else {
                this.$q.reject({ message: 'User has no Token'});
            }
        };


    }
    angular.module('myApp').service('auth', Auth);
}