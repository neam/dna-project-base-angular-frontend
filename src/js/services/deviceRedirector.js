angular.module('Gapminder').factory('deviceRedirector', [
  '$window',
  '$location',
  'urlManager',
function(
  $window,
  $location,
  urlManager
) {
  var REDIRECT_BASE_URL = 'http://m.gapminder.org',
    SESSION_STORAGE_KEY = 'cancelDeviceRedirect',
    QUERY_PARAM_ENABLE = 'enableRedirect',
    QUERY_PARAM_DISABLE = 'disableRedirect';

  return {
    /**
     * Redirects mobile users to the mobile site (unless forced to use desktop).
     */
    run: function() {
      this.saveQueryParam();
      this.redirect();
    },

    /**
     * Stores device redirect related query params.
     */
    saveQueryParam: function() {
      var queryParams = $location.search();

      if (angular.isDefined(queryParams[QUERY_PARAM_DISABLE])) {
        this.cancelRedirects();
      }

      if (angular.isDefined(queryParams[QUERY_PARAM_ENABLE])) {
        this.uncancelRedirects();
      }

      $location.search({}); // remove query param from URL
    },

    /**
     * Cancels redirects (stores the cancel setting in session storage).
     */
    cancelRedirects: function() {
      $window.sessionStorage.setItem(SESSION_STORAGE_KEY, true);
    },

    /**
     * Re-enables redirects (removes the cancel setting from session storage).
     */
    uncancelRedirects: function() {
      $window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    },

    /**
     * Tells whether redirects are disabled.
     */
    isRedirectDisabled: function() {
      return true; // TODO: Uncomment to enable redirects.
      var cancelDeviceRedirect = JSON.parse($window.sessionStorage.getItem(SESSION_STORAGE_KEY));
      return cancelDeviceRedirect;
    },

    /**
     * Performs redirect if permitted.
     */
    redirect: function() {
      if ($window.device.mobile() && !this.isRedirectDisabled()) {
        var route = urlManager.getCurrentRoute();
        $window.location.href = REDIRECT_BASE_URL + route;
      }
    },

    /**
     * Forcefully performs a redirect.
     */
    forceRedirect: function() {
      var route = urlManager.getCurrentRoute();
      $window.location.href = REDIRECT_BASE_URL + route + '?disableRedirect';
    }
  };
}]);
