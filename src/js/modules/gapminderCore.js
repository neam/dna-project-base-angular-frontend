angular.module('gapminderCore', []);

angular.module('gapminderCore').provider('helper', function() {
  /**
   * Ensures that a string contains a leading slash, and returns it.
   * @param {string} str
   * @returns {string}
   */
  function ensureLeadingSlash(str) {
    if (_.isNumber(str)) {
      str = str.toString();
    }

    if (str.charAt(0) !== '/') {
      str = '/' + str;
    }

    return str;
  }

  // Expose provider API
  this.ensureLeadingSlash = ensureLeadingSlash;

  // Expose service API
  this.$get = function() {
    return {
      ensureLeadingSlash: ensureLeadingSlash
    };
  };
});

angular.module('gapminderCore').provider('core', function(helperProvider) {
  /**
   * Creates a template URL.
   * @param {string} path
   * @param {string} version
   * @param {string} assetUrl
   * @param {boolean} testing (defaults to false)
   * @returns {string}
   */
  function createTemplateUrl(path, version, assetUrl, testing) {
    testing = testing || false;

    if (!testing) {
      path = path + '?' + version; // append version
    }

    path = helperProvider.ensureLeadingSlash(path);

    return assetUrl + 'templates' + path;
  }


  // Expose provider API
  this.createTemplateUrl = createTemplateUrl;

  // Expose service API
  this.$get = function() {
    return {
      createTemplateUrl: createTemplateUrl
    };
  };
});
