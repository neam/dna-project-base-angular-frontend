angular.module('Gapminder').controller('NavbarCtrl', [
    '$scope',
    '$http',
    '$window',
    'UserService',
    'urlManager',
    'localeManager',
function(
    $scope,
    $http,
    $window,
    UserService,
    urlManager,
    localeManager
) {
    /**
     * Logs out the user.
     */
    $scope.logout = function() {
        UserService.logout();
    };

    /**
     * Returns the username.
     * @returns {string}
     */
    $scope.getUsername = function() {
        return UserService.info ? UserService.info.username : '';
    };

    /**
     * Sets the current locale.
     * @param {string} locale
     */
    $scope.setLocale = function(locale) {
        localeManager.setCurrentLocale(locale);
        urlManager.reload();
    };
}]);
