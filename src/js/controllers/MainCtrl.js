angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    'UserService',
    'ApiService',
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
    ApiService,
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

    NavigationService.getBaseRoute();

    /**
     * Initializes the controller.
     */
    $scope.init = function() {
        LocaleService.loadLocaleOptions();
    };

    /**
     * Returns the base route.
     * @returns {string}
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

    $scope.$$postDigest(function() {
        // TODO: Get translations.
    });
}]);
