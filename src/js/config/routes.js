angular.module('Gapminder').config([
    '$routeProvider',
    '$locationProvider',
    '$sceDelegateProvider',
    'assetUrl',
    'html5Mode',
function(
    $routeProvider,
    $locationProvider,
    $sceDelegateProvider,
    assetUrl,
    html5Mode
) {
    // HTML5 mode
    $locationProvider.html5Mode(html5Mode);

    // Allow resources from elsewhere
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://static.gapminder.org/**'
    ]);

    var routeTemplateBasePath = assetUrl + 'templates/routes/';

    // Define routes
    var routes = [
        {path: '/', templateFile: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}},
        {path: '/login', templateFile: 'login.html', layout: 'layout-minimal', controller: 'LoginCtrl', access: {requiredLogin: false}},
        {path: '/exercises', templateFile: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}},
        {path: '/exercises/:id', templateFile: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}},
        {path: '/presentations/', templateFile: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}},
        {path: '/presentations/:id', templateFile: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}},
        {path: '/qna', templateFile: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}},
        {path: '/qna/:id', templateFile: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}}
    ];

    // Register routes
    angular.forEach(routes, function(route) {
        $routeProvider
            .when(route.path, {
                templateUrl: routeTemplateBasePath + route.templateFile,
                layout: typeof route.layout !== 'undefined' ? route.layout : 'layout-regular',
                controller: route.controller,
                access: route.access,
                resolve: {
                    // Always make sure i18n is initialized
                    i18n: ['i18nService', function(i18nService) {
                        return i18nService.init();
                    }]
                }
            })
            .otherwise({
                templateUrl: routeTemplateBasePath + 'custom-page.html',
                controller: 'CustomPageCtrl',
                access: {requiredLogin: false},
                resolve: {
                    customPage: ['CustomPageService', '$route', '$location', function(CustomPageService, $route, $location) {
                        return CustomPageService.init($location.$$path);
                    }]
                }
            });
    });
}]);
