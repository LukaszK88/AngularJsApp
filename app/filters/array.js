/**
 * Created by lukas on 08/04/17.
 */
'use strict';

angular.module('myApp').
    filter('arrayHelper',function () {

    return function(category, type) {

        var sum = 0;
        for (var x in category) {
            sum += category[x][type];
        }
        return sum;
    }

    });