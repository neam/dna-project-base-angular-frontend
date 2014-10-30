angular.module('Gapminder').factory('ApiService', function(ConfigService, baseApiUrl) {
    var compositionTypeToItemPathNameMap = {
        exercise: 'exercises'
    };

    return {
        /**
         * Resolves and returns an API URL.
         * @param {string} uri
         * @returns {string}
         */
        getApiUrl: function(uri) {
            return baseApiUrl + uri;
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
        }
    }
});
