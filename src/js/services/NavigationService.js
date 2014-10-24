angular.module('Gapminder').factory('NavigationService', function($location, html5Mode, baseRoute) {
    return {
        /**
         * Creates a URL while taking the baseRoute into account.
         * @param {string} route
         * @returns {string}
         */
        createUrl: function(route) {
            if (route.charAt(0) !== '/') {
                // Ensure leading slash
                route = '/' + route;
            }

            if (!html5Mode) {
                route = '/#' + route;
            }

            return baseRoute + route;
        },

        /**
         * Creates a raw URL while taking the baseRoute into account but always without a hashbang (e.g. with links to images, files, etc.)
         * @param {string} route
         * @returns {string}
         */
        createRawUrl: function(route) {
            if (route.charAt(0) !== '/') {
                // Ensure leading slash
                route = '/' + route;
            }

            return baseRoute + route;
        },

        /**
         * Redirects to the given route.
         * @param {string} route
         */
        redirect: function(route) {
            $location.path(route);
        }
    }
});
