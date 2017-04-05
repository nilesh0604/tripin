'use strict';

/**
 * @ngdoc function
 * @name tripinApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tripinApp
 */


angular.module('tripinApp')
    .controller('RegisterCtrl', function($scope, $rootScope, $location, userService, Upload, env, $timeout) {
        var vm = this;

        vm.newUser = {};



        vm.loading = false;

        vm.addNewUser = function() {
            vm.newUser.admin = 'false';
            vm.loading = true;
            userService.addNewUser(vm.newUser).then(function(user) {
                //console.log(user);
                vm.loading = false;
                alert('Use "' + user.username + '" as Username to login');
                $location.path('/login');
            });
        };

        vm.submitForm = function() {
            console.log($scope.registerUser);
            // check to make sure the form is completely valid
            if ($scope.registerUser.$valid) {
                vm.addNewUser();
            }
        };


        var uploadedImages = [];

        var uploadCount = 0;

        $scope.allUploadFinished = false;
        $scope.sectionLoading = false;

        $scope.updateImages = function() {
            var product = {};
            product._id = $routeParams.id;
            product.images = uploadedImages;
            $scope.sectionLoading = true;
            productService.updateProductImages(product).then(function(product) {
                $scope.sectionLoading = false;
                $location.path('/product/' + product._id);
            });
        };

        $scope.uploadFiles = function(files, errFiles) {
            vm.newUser.photo = "";
            console.log(files);
            if(files.length)
            
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: env.TRIPINAPIURL+'uploadImages',
                    data: { file: file }
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        if(uploadCount === 0){
                            uploadedImages = response.data.filesUploaded;
                        }
                        file.result = response.data;
                        uploadCount++;
                        if(uploadCount === $scope.files.length){
                            $scope.allUploadFinished = true;
                        }
                        vm.newUser.photo = files[0].name;
                        vm.newUser.avatar = response.data.url;
                        console.log(response.data.url);
                    });
                }, function(response) {
                    if (response.status > 0){
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    if(file.progress === 100){
                        file.uploadFinished = true;
                    }
                    else{
                        file.uploadFinished = false;
                    }  
                });
            });
        };




        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });