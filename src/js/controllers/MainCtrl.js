angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$http',
    'UserService',
    'ApiService',
    'LocaleService',
    'i18nService',
    'baseRoute',
function(
    $scope,
    $http,
    UserService,
    ApiService,
    LocaleService,
    i18nService,
    baseRoute
) {
    $scope.user = UserService;
    $scope.locale = LocaleService;
    $scope.baseRoute = baseRoute;

    $scope.$$postDigest(function() {
        // TODO: Get translations.
    });
}]);
