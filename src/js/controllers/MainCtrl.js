angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    'UserService',
    'ApiService',
    'LocaleService',
    'i18nService',
    'baseRoute',
    'NavigationService',
    'LoadService',
function(
    $scope,
    $rootScope,
    $http,
    UserService,
    ApiService,
    LocaleService,
    i18nService,
    baseRoute,
    NavigationService,
    LoadService
) {
    $rootScope.locale = LocaleService;
    $rootScope.load = LoadService;
    $scope.user = UserService;
    $scope.baseRoute = baseRoute;

    /**
     * Initializes the controller.
     */
    $scope.init = function() {
        LocaleService.loadLocaleOptions();
    },

    /**
     * @see NavigationService#createUrl
     */
    $scope.createUrl = function(route) {
        return NavigationService.createUrl(route);
    };

    /**
     * @see NavigationService#createRawUrl
     */
    $scope.createRawUrl = function(route) {
        return NavigationService.createRawUrl(route);
    };

    $scope.$$postDigest(function() {
        // TODO: Get translations.
    });
}]);
