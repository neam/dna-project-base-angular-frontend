angular.module('Gapminder').controller('NavbarCtrl', function($scope, $http, $window, userManager, urlManager, localeManager) {
  /**
   * Logs out the user.
   */
  $scope.logout = function() {
    userManager.logout();
  };

  /**
   * Returns the username.
   * @returns {string}
   */
  $scope.getUsername = function() {
    return userManager.info ? userManager.info.username : '';
  };

  /**
   * Sets the current locale.
   * @param {string} locale
   */
  $scope.setLocale = function(locale) {
    localeManager.setCurrentLocale(locale);
    urlManager.reload();
  };
});
