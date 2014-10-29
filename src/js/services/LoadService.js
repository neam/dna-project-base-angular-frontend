angular.module('Gapminder').factory('LoadService', function($rootScope) {
    var initialPageLoadComplete = false,
        contentLoadComplete = false;

    // Initial page load
    (function() {
        angular.element(document).ready(function() {
            initialPageLoadComplete = true;
        });
    })();

    // Content load (API calls)
    $rootScope.$on('finishedLoading', function() {
        contentLoadComplete = true;
    });

    return {
        /**
         * Checks if the page has been fully loaded.
         * @returns {boolean}
         */
        pageFullyLoaded: function() {
            return initialPageLoadComplete && contentLoadComplete;
        }
    };
});
