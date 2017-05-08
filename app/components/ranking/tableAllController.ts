
module myApp.ranking{

    'use-strict';

    export class TableAllController {
            static $inject =[
                '$http',
                '$scope'
            ];

            constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope){

                this.$http.get("http://127.0.0.1:8000/api/fighters/")
                    .then(function(response: ng.IHttpPromiseCallbackArg<any>) {
                        $scope.fighters = response.data.fighters;

                    });
            }
      }

      angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
}

