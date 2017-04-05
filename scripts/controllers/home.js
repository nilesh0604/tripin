'use strict';

/**
 * @ngdoc function
 * @name tripinApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the tripinApp
 */
angular.module('tripinApp')
    .controller('HomeCtrl', function() {

        var vm = this;

        vm.lat = 19.07, vm.lng = 72.87;

    });