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

    /**
     * Sends an authentication request.
     * @returns {Deferred.promise}
     */
    $scope.login = function() {
        var dfd = $q.defer();

        UserService.login($scope.username, $scope.password)
            .then(function(res) {
                UserService.ensureInfo();
                NavigationService.redirect('/'); // TODO: Redirect to www.gapminder.org/friends
                dfd.resolve(res);
            }, function(err) {
                $scope.errors = err.data.errors;
                dfd.reject(err);
            });

        return dfd.promise;
    };
}]);
