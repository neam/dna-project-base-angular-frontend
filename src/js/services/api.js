angular.module('Gapminder').factory('api', function(configManager, utils, baseApiUrl) {
  var compositionTypeToItemPathNameMap = {
    exercise: 'exercises',
    presentation: 'presentations'
  };

  return {
    /**
     * Resolves and returns an API URL.
     * @param {string} uri
     * @returns {string}
     */
    getApiUrl: function(uri) {
      return utils.stripTrailingSlash(baseApiUrl + uri)
    },

    /**
     * Returns a composition item path name by type.
     * @param {string} compositionType
     * @returns {string}
     */
    getCompositionItemPathName: function(compositionType) {
      return angular.isDefined(compositionTypeToItemPathNameMap[compositionType])
        ? compositionTypeToItemPathNameMap[compositionType]
        : compositionType;
    },

    /**
     * Serializes form data.
     * @param {Object} data
     * @returns {string}
     */
    serializeFormData: function(data) {
      var str = [];

      angular.forEach(data, function(value, key) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      });

      return str.join('&');
    }
  }
});
