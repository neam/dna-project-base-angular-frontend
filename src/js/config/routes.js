angular.module('Gapminder').config(['$routeProvider', '$locationProvider', 'html5Mode', 'baseRoute', function($routeProvider, $locationProvider, html5Mode, baseRoute) {
    var routeTemplateBasePath = baseRoute + '/templates/routes/';

    $locationProvider.html5Mode(html5Mode);

    // Define routes
    var routes = [
        {path: '/', templateFile: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}, title: 'Home'},
        {path: '/login', templateFile: 'login.html', layout: 'layout-minimal', controller: 'LoginCtrl', access: {requiredLogin: false}, title: 'Login'},
        {path: '/video/:permalink/:lang', templateFile: 'go.html', controller: 'GoCtrl', access: {requiredLogin: false}, title: 'Item'}
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
