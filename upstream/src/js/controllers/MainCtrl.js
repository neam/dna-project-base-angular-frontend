angular.module('Gapminder').controller('MainCtrl', function($scope, $rootScope, $http, $location, userManager, api, localeManager, urlManager, uiTranslator, pageLoader) {
  $rootScope.pageLoader = pageLoader;
  $rootScope.localeMgr = localeManager;
  $rootScope.urlMgr = urlManager;
  $rootScope.userMgr = userManager;

  /**
   * Initializes the controller.
   */
  $scope.init = function() {
    localeManager.loadLocaleOptions();
  };

  /**
   * Triggers page not found.
   */
  $scope.notFound = urlManager.notFound;

  /**
   * Returns the page title.
   * @returns {string}
   */
  $rootScope.getPageTitle = function() {
    var title = 'Gapminder';

    if (angular.isDefined($rootScope.pageTitle)) {
      title = $rootScope.pageTitle + ' - ' + title;
    }

    return title;
  };

  /**
   * Returns the meta description.
   * @returns {string}
   */
  $rootScope.getMetaDescription = function() {
    return $rootScope.metaDescription || uiTranslator.translate('metatag:meta-description-fallback', {}, 'A fact-based worldview');
  };

  /**
   * @see urlManager#getBaseRoute
   */
  $rootScope.getBaseRoute = function() {
    return urlManager.getBaseRoute();
  };

  /**
   * @see urlManager#createUrl
   */
  $scope.createUrl = function(route) {
    return urlManager.createUrl(route);
  };

  /**
   * @see urlManager#createAssetUrl
   */
  $scope.createAssetUrl = function(path) {
    return urlManager.createAssetUrl(path);
  };

  /**
   * @see urlManager#createTemplateUrl
   */
  $scope.createTemplateUrl = function(path) {
    return urlManager.createTemplateUrl(path);
  }
});
