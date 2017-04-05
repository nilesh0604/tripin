'use strict';

/**
 * @ngdoc service
 * @name tripinApp.productService
 * @description
 * # productService
 * Service in the tripinApp.
 */
angular.module('tripinApp')
    .service('userService', function($http, $q, env) {


    	function getUsers() {
            var request = $http({
                method: 'GET',
                url: env.TRIPINAPIURL+'users',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        function handleSuccess(response) {
            return (response.data);
        }


        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError(response) {


            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (!angular.isObject(response.data) ||
                !response.data.message
            ) {
                return ($q.reject('An unknown error occured.'));
            }
        }

        function updateUser(user) {
            var request = $http({
                method: 'PUT',
                url: env.TRIPINAPIURL+'users',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        function addNewUser(user) {
            var request = $http({
                method: 'POST',
                url: env.TRIPINAPIURL+'users',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        function deleteUser(id) {
            var request = $http({
                method: 'DELETE',
                url: env.TRIPINAPIURL+'users/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        return ({
            getUsers: getUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            addNewUser: addNewUser
        });

    });