angular.module('Gapminder').config(function($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider, assetUrl, html5Mode) {
  // HTML5 mode
  $locationProvider.html5Mode(html5Mode);

  // Allow resources from elsewhere
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://static.gapminder.org/**'
  ]);

  var routeTemplateBasePath = assetUrl + 'templates/states/';

  // Define states
  var states = [
    {name: 'login', url: '/login', templateUrl: 'login.html', layout: 'layout-minimal', controller: 'LoginCtrl', access: {requiredLogin: false}},
    {name: 'exercise', url: '/exercises/:id', templateUrl: 'go-item.html', controller: 'GoItemCtrl', access: {requiredLogin: false}},
    {name: 'presentation', url: '/presentations/:id', templateUrl: 'go-item.html', controller: 'GoItemCtrl', access: {requiredLogin: false}},
    {name: 'qna', url: '/qna/:id', templateUrl: 'go-item.html', controller: 'GoItemCtrl', access: {requiredLogin: false}}
  ];

  angular.forEach(states, function(state) {
    $stateProvider.state(state.name, {
      url: state.url,
      templateUrl: routeTemplateBasePath + state.templateUrl,
      layout: state.layout || 'layout-regular',
      access: state.access,
      controller: state.controller,
      resolve: {
        // Always make sure i18n is initialized
        i18n: ['uiTranslator', function(uiTranslator) {
          return uiTranslator.init();
        }]
      }
    });
  });

  // Handle root
  $urlRouterProvider.when('', '/');

  // Custom pages
  $stateProvider.state('wildcardPage', {
    url: ':id',
    templateUrl: routeTemplateBasePath + 'wildcard-page.html',
    controller: 'WildcardPageCtrl',
    access: {requiredLogin: false},
    resolve: {
      // Always make sure i18n is initialized
      i18n: ['uiTranslator', function(uiTranslator) {
        return uiTranslator.init();
      }]
    }
  });

  // Apply custom page state
  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('wildcardPage', {}, {reload: true});
  });
});
