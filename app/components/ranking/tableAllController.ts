
module myApp.ranking{

    'use-strict';

    export class TableAllController {
            static $inject =[
                '$http',
                '$scope',
                '$location'
            ];

            public $path:number;


            constructor(public $http:ng.IHttpService,
                        public $scope:ng.IScope,
                        public $location:any
            ){


                this.$scope.$watch('selectedIndex', (newVal:any,old:any) => {
                    console.log(newVal);
                   this.$path = newVal
                });


                if(this.$path = '0'){
                    this.$http.get("http://127.0.0.1:8000/api/fighters/")
                        .then(function(response: ng.IHttpPromiseCallbackArg<any>) {
                            $scope.fighters = response.data.fighters;

                        });
                }
                if(this.$path = '1'){
                    this.$http.get("http://127.0.0.1:8000/api/fighters/bohurt/")
                        .then(function(response:ng.IHttpPromiseCallbackArg<any>) {
                            $scope.fighters = response.data.fighters;
                        });
                }


            }
      }

      angular.module('myApp.ranking').controller('myApp.ranking.TableAllController', TableAllController);
}

