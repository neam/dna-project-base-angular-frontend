angular.module('Gapminder').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$sceDelegateProvider',
    '$urlMatcherFactory',
    'assetUrl',
    'html5Mode',
function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $sceDelegateProvider,
    $urlMatcherFactory,
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

    var routeTemplateBasePath = assetUrl + 'templates/states/';

    var presentationMatcher = $urlMatcherFactory.compile('/presentations/:id');

    // Define states
    var states = [
        {name: 'home', url: '/', templateUrl: 'home.html', controller: 'HomeCtrl', access: {requiredLogin: false}},
        {name: 'item', url: '/item', templateUrl: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}},
        {name: 'exercise', url: '/exercises/:id', templateUrl: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}},
        {name: 'presentation', url: '/presentations/:id', templateUrl: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}},
        {name: 'qna', url: '/qna/:id', templateUrl: 'item.html', controller: 'ItemCtrl', access: {requiredLogin: false}}
    ];

    angular.forEach(states, function(state) {
        $stateProvider.state(state.name, {
            url: state.url,
            templateUrl: routeTemplateBasePath + state.templateUrl,
            access: state.access,
            controller: state.controller,
            resolve: {
                // Always make sure i18n is initialized
                i18n: ['i18nService', function(i18nService) {
                    return i18nService.init();
                }]
            }
        });
    });

    // Handle root
    $urlRouterProvider.when('', '/');

    // Custom pages
    $stateProvider.state('customPage', {
        url: ':id',
        templateUrl: routeTemplateBasePath + 'custom-page.html',
        controller: 'CustomPageCtrl',
        access: {requiredLogin: false},
        resolve: {
            // Always make sure i18n is initialized
            i18n: ['i18nService', function(i18nService) {
                return i18nService.init();
            }]
        }
    });

    // Apply custom page state
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get('$state');
        $state.go('customPage');
    });
}]);
