angular.module('Gapminder').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    var routeTemplateBasePath = '/templates/routes/';

    $locationProvider.html5Mode(true);

    // Define routes
    var routes = [
        {path: '/', templateFile: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}, title: 'Home'},
        {path: '/login', templateFile: 'login.html', layout: 'layout-minimal', controller: 'LoginCtrl', access: {requiredLogin: false}, title: 'Login'}
    ];

    // Register routes
    angular.forEach(routes, function(route) {
        $routeProvider.when(route.path, {
            templateUrl: routeTemplateBasePath + route.templateFile,
            layout: typeof route.layout !== 'undefined' ? route.layout : 'layout-regular',
            controller: route.controller,
            access: route.access,
            title: route.title
        });
    });
}]);
