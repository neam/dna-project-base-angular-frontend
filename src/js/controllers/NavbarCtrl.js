angular.module('Gapminder').controller('NavbarCtrl', [
    '$scope',
    'UserService',
    'NavigationService',
    'LocaleService',
function(
    $scope,
    UserService,
    NavigationService,
    LocaleService
) {
    /**
     * Logs out the user.
     */
    $scope.logout = function() {
        UserService.logout();
        NavigationService.redirect('/');
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
        LocaleService.setLocale(locale);
    };
}]);
