'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'UserApp'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', login: true});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', public: true});
  $routeProvider.when('/verify-email', {templateUrl: 'partials/verify-email.html', verify_email: true});
  $routeProvider.when('/reset-password', {templateUrl: 'partials/reset-password.html', public: true});
  $routeProvider.when('/set-password', {templateUrl: 'partials/set-password.html', set_password: true});
  $routeProvider.when('/articles', {templateUrl: 'partials/articles.html', controller: 'ArticlesCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).
run(function(user) {
  user.init({ appId: 'foo' });
});
