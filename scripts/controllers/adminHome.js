'use strict';

/**
 * @ngdoc function
 * @name tripinApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the tripinApp
 */
angular.module('tripinApp')
    .controller('AdminHomeCtrl', function($scope, $rootScope, userService, NgTableParams, $uibModal, $log, $document) {

        var self = this;

        self.loading = true;

        function getUsers() {
            userService.getUsers().then(function(users) {
                var data = users;
                self.tableParams = new NgTableParams({}, { dataset: data });
                self.loading = false;
            });
        }


        function updateUser(user) {
            self.loading = true;
            userService.updateUser(user).then(function(user) {
                var data = user;
                self.loading = false;
            });
        }

        self.deleteUser = function(id) {
            console.log(id);
            self.loading = true;
            userService.deleteUser(id).then(function() {
                var userId = String(id);
                self.loading = false;
                $scope.$apply();
                var user = angular.element(document.getElementById(userId));
                user.remove();
            });
        };



        self.open = function(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    items: function() {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                //ok callback
                updateUser(selectedItem);
            }, function() {
                //cancel callback
            });
        };

        getUsers();

    });

angular.module('tripinApp').controller('ModalInstanceCtrl', function($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.selected = items;

    $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.selected);
    };

    $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});