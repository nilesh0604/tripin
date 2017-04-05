'use strict';

/**
 * @ngdoc overview
 * @name tripinApp
 * @description
 * # tripinApp
 *
 * Main module of the application.
 */
angular
    .module('tripinApp', [
        'ngRoute',
        'ngFileUpload',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ui.bootstrap',
        'ngMap',
        'ngTable'
    ])
    .config(function($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login',
                showLeftPanel: false,
                AuthRequired: false
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
                showLeftPanel: false,
                AuthRequired: false
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                showLeftPanel: true,
                AuthRequired: true
            })
            .when('/adminHome', {
                templateUrl: 'views/adminHome.html',
                controller: 'AdminHomeCtrl',
                controllerAs: 'vm',
                showLeftPanel: true,
                AuthRequired: true
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function($rootScope, $location, $cookieStore, $http) {
            $rootScope.showLeftPanel = false;

            $rootScope.$on('$routeChangeStart', function(event, next, current) {

                $rootScope.showLeftPanel = next.showLeftPanel;
                $rootScope.loading = true;
                if (next.AuthRequired && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }

                if ($location.path() === '/adminHome' && $rootScope.globals.currentUser.admin == "false") {
                    $location.path('/login');
                }
            })

            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};

            if ($rootScope.globals.token) {
                $http.defaults.headers.common['x-access-token'] = $rootScope.globals.token; // jshint ignore:line
            }

            $rootScope.$on('$routeChangeSuccess', function() {
                $rootScope.loading = false;
            });
        }
    ])