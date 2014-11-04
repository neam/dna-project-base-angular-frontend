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
    'TranslateUiService',
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
    TranslateUiService,
    LoadService,
    environment
) {
    $rootScope.locale = LocaleService;
    $rootScope.load = LoadService;
    $scope.user = UserService;
    $scope.translateUi = TranslateUiService;

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
        switch(environment) {
            case 'production':
                return '/' + NavigationService.getPartOfPath(0) + '/';

            case 'stage':
                return '/pages-desktop-stage/';

            default:
                return '/';
        }
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
