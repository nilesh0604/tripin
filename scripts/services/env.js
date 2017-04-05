'use strict';

/**
 * @ngdoc service
 * @name tripinApp.env
 * @description
 * # env
 * Constant in the tripinApp.
 */
angular.module('tripinApp')
  .constant('env', (function() {

  var heroku = 'https://ibarterapi.herokuapp.com/';
  var localhost = 'http://localhost:5000/';

  return {
  	TRIPINAPIURL: localhost+'api/'
  };
})());
