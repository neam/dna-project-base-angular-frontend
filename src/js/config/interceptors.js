angular.module('Gapminder').config(function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});
