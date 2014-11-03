angular.module('Gapminder').factory('NavigationService', function($location, environment, html5Mode) {
    return {
        /**
         * Redirects to the given route.
         * @param {string} route
         */
        redirect: function(route) {
            $location.path(route);
        },

        /**
         * Creates a URL.
         * @param {string} route
         * @returns {string}
         */
        createUrl: function(route) {
            // Ensure leading slash
            if (route.charAt(0) !== '/') {
                route = '/' + route;
            }

            return html5Mode ? route : '#' + route;
        },

        /**
         * Creates an asset URL.
         * @param {string} path
         * @returns {string}
         */
        createAssetUrl: function(path) {
            // Remove leading slash
            if (path.charAt(0) === '/') {
                path = path.replace('/', '');
            }

            return path;
        },

        /**
         * Splits a URL path into parts.
         * @param {string} path
         * @returns {Array}
         */
        splitPath: function(path) {
            var pathWithoutLeadingSlash = path.charAt(0) === '/' ? path.substr(1) : path;
            return pathWithoutLeadingSlash.split('/');
        },

        /**
         * Returns the given part of the URL path by array index.
         * @param {number} index
         * @returns {string}
         */
        getPartOfPath: function(index) {
            var path = this.splitPath($location.path());
            return angular.isDefined(path[index]) ? path[index] : null;
        }
    }
});
