angular.module('Gapminder').factory('NavigationService', function($location) {
    return {
        /**
         * Redirects to the given route.
         * @param {string} route
         */
        redirect: function(route) {
            $location.path(route);
        }
    }
});
