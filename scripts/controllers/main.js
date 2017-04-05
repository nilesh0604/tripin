'use strict';

/**
 * @ngdoc function
 * @name tripinApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripinApp
 */
angular.module('tripinApp')
    .controller('MainCtrl', function($rootScope, $scope, $location) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        

        $scope.logout = function(){
            $location.path('/login');
        }
    });
