angular.module('Gapminder').factory('loadInterceptor', function($q, $rootScope, $timeout) {
  var loadCount = 0;

  return {
    request: function(config) {
      loadCount += 1;

      $rootScope.$broadcast('startedLoading');

      return config || $q.when(config);
    },
    response: function(response) {
      loadCount -= 1;

      if (loadCount < 1) {
        // TODO: Replace this timeout hack with a proper solution.
        $timeout(function() {
          $rootScope.$broadcast('finishedLoading');
        }, 0);
      }

      // Google Custom Search hacks
      angular.element('input.gsc-search-button').val("\0"); // remove "Search" button label

      return response || $q.when(response);
    },
    responseError: function(response) {
      loadCount -= 1;

      if (!loadCount) {
        $rootScope.$broadcast('finishedLoading');
      }

      return $q.reject(response);
    }
  };
}).config(function($httpProvider) {
  $httpProvider.interceptors.push('loadInterceptor');
});
