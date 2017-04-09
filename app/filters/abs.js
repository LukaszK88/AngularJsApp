/**
 * Created by lukas on 09/04/17.
 */
angular.module('myApp').
    filter('abs', function () {
    return function(val) {
        return Math.abs(val);
    }
});