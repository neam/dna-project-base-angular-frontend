angular.module('Gapminder').controller('MainCtrl', [
    '$scope',
    '$http',
    'UserService',
    'ApiService',
    'LocaleService',
function(
    $scope,
    $http,
    UserService,
    ApiService,
    LocaleService
) {
    $scope.user = UserService;
    $scope.locale = LocaleService;
}]);
