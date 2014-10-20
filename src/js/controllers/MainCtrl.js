angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$http',
    'UserService',
    'ApiService',
    'LocaleService',
    'i18nService',
function(
    $scope,
    $http,
    UserService,
    ApiService,
    LocaleService,
    i18nService
) {
    $scope.user = UserService;
    $scope.locale = LocaleService;

    $scope.$$postDigest(function() {
        // TODO: Get translations.
    });
}]);
