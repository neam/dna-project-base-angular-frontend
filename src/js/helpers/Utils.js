angular.module('Gapminder').factory('Utils', [function() {
    return {
        /**
         * Strips a leading slash if present, and returns the string.
         * @param {string} str
         * @returns {string}
         */
        stripLeadingSlash: function(str) {
            if (str.charAt(0) === '/') {
                str = str.replace(/^\//, '');
            }

            return str;
        },

        /**
         * Strips a trailing slash if present, and returns the string.
         * @param {string} str
         * @returns {string}
         */
        stripTrailingSlash: function(str) {
            var lastCharPos = str.length - 1;

            if (str.charAt(lastCharPos) === '/') {
                str = str.replace(/\/$/g, '');
            }

            return str;
        },

        /**
         * Ensures that a string contains a leading slash, and returns it.
         * @param {string} str
         * @returns {string}
         */
        ensureLeadingSlash: function(str) {
            if (str.charAt(0) !== '/') {
                str = '/' + str;
            }

            return str;
        },

        /**
         * Ensures that a string contains a trailing slash, and returns it.
         * @param {string} str
         * @returns {string}
         */
        ensureTrailingSlash: function(str) {
            var lastCharPos = str.length - 1;

            if (str.charAt(lastCharPos) !== '/') {
                str = str + '/';
            }

            return str;
        }
    };
}]);
