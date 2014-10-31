angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    'UserService',
    'ApiService',
    'LocaleService',
    'i18nService',
    'NavigationService',
    'LoadService',
    'environment',
function(
    $scope,
    $rootScope,
    $http,
    $location,
    UserService,
    ApiService,
    LocaleService,
    i18nService,
    NavigationService,
    LoadService,
    environment
) {
    $rootScope.locale = LocaleService;
    $rootScope.load = LoadService;
    $scope.user = UserService;

    /**
     * Returns the base route.
     * @returns {string}
     */
    $rootScope.getBaseRoute = function() {
        return environment === 'production' ? '/' + NavigationService.getPartOfPath($location.path(), 0) + '/' : '/';
    };

    /**
     * @see NavigationService#createUrl
     */
    $scope.createUrl = function(route) {
        return NavigationService.createUrl(route);
    };

    /**
     * Initializes the controller.
     */
    $scope.init = function() {
        LocaleService.loadLocaleOptions();
    },

    $scope.$$postDigest(function() {
        // TODO: Get translations.
    });
}]);
