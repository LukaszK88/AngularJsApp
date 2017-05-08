module myApp.ranking{

    export class TableBohurtController {
        static $inject =[
            '$http',
            '$scope'
        ];

        constructor(public $http:ng.IHttpService,
                    public $scope:ng.IScope){

            this.$http.get("http://127.0.0.1:8000/api/fighters/bohurt/")
                .then(function(response:ng.IHttpPromiseCallbackArg<any>) {
                    $scope.fighters = response.data.fighters;

                });
        }
    }

    angular.module('myApp.ranking').controller('myApp.ranking.TableBohurtController', TableBohurtController);

}

