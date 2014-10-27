angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$http',
    'UserService',
    'ApiService',
    'LocaleService',
    'i18nService',
    'baseRoute',
    'NavigationService',
function(
    $scope,
    $http,
    UserService,
    ApiService,
    LocaleService,
    i18nService,
    baseRoute,
    NavigationService
) {
    $scope.user = UserService;
    $scope.locale = LocaleService;
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
