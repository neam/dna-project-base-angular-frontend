angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    'UserService',
    'api',
    'LocaleService',
    'NavigationService',
    'i18nService',
    'LoadService',
function(
    $scope,
    $rootScope,
    $http,
    $location,
    UserService,
    api,
    LocaleService,
    NavigationService,
    i18nService,
    LoadService
) {
    $rootScope.locale = LocaleService;
    $rootScope.load = LoadService;
    $rootScope.i18n = i18nService;
    $rootScope.navigation = NavigationService;
    $scope.user = UserService;

    /**
     * Initializes the controller.
     */
    $scope.init = function() {
        LocaleService.loadLocaleOptions();
    };

    /**
     * Triggers page not found.
     */
    $scope.notFound = NavigationService.notFound;

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
        return $rootScope.metaDescription || i18nService.translate('metatag:meta-description-fallback', {}, 'A fact-based worldview');
    };

    /**
     * @see NavigationService#getBaseRoute
     */
    $rootScope.getBaseRoute = function() {
        return NavigationService.getBaseRoute();
    };

    /**
     * @see NavigationService#createUrl
     */
    $scope.createUrl = function(route) {
        return NavigationService.createUrl(route);
    };

    /**
     * @see NavigationService#createAssetUrl
     */
    $scope.createAssetUrl = function(path) {
        return NavigationService.createAssetUrl(path);
    };

    /**
     * @see NavigationService#createTemplateUrl
     */
    $scope.createTemplateUrl = function(path) {
        return NavigationService.createTemplateUrl(path);
    }
}]);
