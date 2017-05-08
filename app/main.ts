/**
 * Created by lukas on 22/04/17.
 */

/// <reference path="_all.ts" />

module myApp.ranking{
    'use strict';

    interface IRanking{
        sayHello():any;
        sayBye():any;
    }

    class RankingController implements IRanking{
        static $inject = [
            '$scope'
        ];
        constructor(public $scope:any){
            this.sayHello();
        }

        public sayHello(){
            console.log('hello');
        }

        public sayBye(){
            alert('kaka');
        }

    }

    angular.module('myApp').controller('myApp.ranking.RankingController', RankingController);
}