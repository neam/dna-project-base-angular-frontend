angular.module('Gapminder').controller('NavbarCtrl', [
    '$scope',
    '$http',
    '$window',
    'UserService',
    'NavigationService',
    'LocaleService',
    'ApiService',
function(
    $scope,
    $http,
    $window,
    UserService,
    NavigationService,
    LocaleService,
    ApiService
) {
    var lang = LocaleService.getCurrentLocale();

    $http.get(ApiService.getApiUrl('/navbar/' + lang))
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
        LocaleService.setCurrentLocale(locale);
        $window.location.reload();
    };
}]);
