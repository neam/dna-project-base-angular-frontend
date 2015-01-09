angular.module('Gapminder').factory('utils', [function() {
  return {
    /**
     * Strips a leading slash if present, and returns the string.
     * @param {string} str
     * @returns {string}
     */
    stripLeadingSlash: function(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

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
      if (_.isNumber(str)) {
        str = str.toString();
      }

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
      if (_.isNumber(str)) {
        str = str.toString();
      }

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
      if (_.isNumber(str)) {
        str = str.toString();
      }

      var lastCharPos = str.length - 1;

      if (str.charAt(lastCharPos) !== '/') {
        str = str + '/';
      }

      return str;
    },

    /**
     * Converts a string containing HTML markup to plain text.
     * @param {string} string
     * @returns {string}
     */
    htmlToPlainText: function(string) {
      return String(string).replace(/<[^>]+>/gm, '');
    }
  };
}]);
