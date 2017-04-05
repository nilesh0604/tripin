'use strict';

/**
 * @ngdoc function
 * @name tripinApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tripinApp
 */


angular.module('tripinApp')
    .controller('LoginCtrl', function($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.loginFn = function() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password).then(function(response){
                if (response.success) {
                    AuthenticationService.SetCredentials(response);
                    if(response.user.admin === "true"){
                        $location.path('/adminHome');
                    }else{
                        $location.path('/home');
                    }
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            
            });
        };

        

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });