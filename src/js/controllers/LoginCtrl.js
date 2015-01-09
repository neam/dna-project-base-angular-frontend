angular.module('Gapminder').controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$q',
    'userManager',
    'uiTranslator',
    'urlManager',
function(
    $scope,
    $rootScope,
    $q,
    userManager,
    uiTranslator,
    urlManager
) {
    $scope.navigation.setTranslatedPageTitle('login', 'Login');
    $scope.credentials = {};

    /**
     * Sends an authentication request.
     * @returns {Deferred.promise}
     */
    $scope.login = function() {
        var dfd = $q.defer();

        userManager.login($scope.credentials.username, $scope.credentials.password)
            .success(function(res) {
                userManager.ensureInfo();
                urlManager.redirectToReturnUrl();
                dfd.resolve(res);
            })
            .error(function(err) {
                $scope.errors = err.data.errors;
                dfd.reject(err);
            });

        return dfd.promise;
    };
}]);
