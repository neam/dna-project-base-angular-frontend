angular.module('Gapminder').config(function($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider, coreProvider, assetUrl, html5Mode, version, buildHash, testing) {
  // HTML5 mode
  $locationProvider.html5Mode(html5Mode);

  // Allow resources from elsewhere
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://static.gapminder.org/**'
  ]);

  // Define states
  var states = [
    {name: 'login', url: '/login', templateUrl: 'states/login.html', layout: 'layout-minimal', controller: 'LoginCtrl', access: {requiredLogin: false}},
    {name: 'exercise', url: '/exercises/:id', templateUrl: 'states/go-item.html', controller: 'GoItemCtrl', access: {requiredLogin: false}},
    {name: 'presentation', url: '/presentations/:id', templateUrl: 'states/go-item.html', controller: 'GoItemCtrl', access: {requiredLogin: false}},
    {name: 'qna', url: '/qna/:id', templateUrl: 'states/go-item.html', controller: 'GoItemCtrl', access: {requiredLogin: false}}
  ];

  var cacheBusterString = version + '-' + buildHash;

  angular.forEach(states, function(state) {
    $stateProvider.state(state.name, {
      url: state.url,
      templateUrl: coreProvider.createTemplateUrl(state.templateUrl, cacheBusterString, assetUrl, testing),
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
    templateUrl: coreProvider.createTemplateUrl('states/wildcard-page.html', cacheBusterString, assetUrl, testing),
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
