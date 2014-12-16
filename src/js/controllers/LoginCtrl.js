angular.module('Gapminder').controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$q',
    'UserService',
    'i18nService',
    'NavigationService',
function(
    $scope,
    $rootScope,
    $q,
    UserService,
    i18nService,
    NavigationService
) {
    $scope.navigation.setTranslatedPageTitle('login', 'Login');
    $scope.credentials = {};

    /**
     * Sends an authentication request.
     * @returns {Deferred.promise}
     */
    $scope.login = function() {
        var dfd = $q.defer();

        UserService.login($scope.credentials.username, $scope.credentials.password)
            .then(function(res) {
                UserService.ensureInfo();
                NavigationService.redirectToReturnUrl();
                dfd.resolve(res);
            }, function(err) {
                $scope.errors = err.data.errors;
                dfd.reject(err);
            });

        return dfd.promise;
    };
}]);
