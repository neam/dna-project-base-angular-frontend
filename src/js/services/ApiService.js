angular.module('Gapminder').factory('ApiService', [
    'ConfigService',
    'Utils',
    'baseApiUrl',
function(
    ConfigService,
    Utils,
    baseApiUrl
) {
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
            return Utils.stripTrailingSlash(baseApiUrl + uri)
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
}]);
