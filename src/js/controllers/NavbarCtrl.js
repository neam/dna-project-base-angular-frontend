angular.module('Gapminder').controller('NavbarCtrl', [
    '$scope',
    '$http',
    'UserService',
    'NavigationService',
    'LocaleService',
    'ApiService',
function(
    $scope,
    $http,
    UserService,
    NavigationService,
    LocaleService,
    ApiService
) {
    $http.get(ApiService.getApiUrl('/navbar/items'))
        .then(function(res) {
            $scope.expandedItems = res.data;
        });

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
