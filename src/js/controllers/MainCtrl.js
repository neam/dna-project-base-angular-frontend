angular.module('Gapminder').controller('MainCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$location',
  'userManager',
  'api',
  'localeManager',
  'urlManager',
  'uiTranslator',
  'pageLoader',
function(
  $scope,
  $rootScope,
  $http,
  $location,
  userManager,
  api,
  localeManager,
  urlManager,
  uiTranslator,
  pageLoader
) {
  $rootScope.locale = localeManager;
  $rootScope.load = pageLoader;
  $rootScope.i18n = uiTranslator;
  $rootScope.navigation = urlManager;
  $scope.user = userManager;

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
}]);
