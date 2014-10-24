angular.module('Gapminder').factory('ApiService', function(ConfigService, baseApiUrl) {
    var itemTypeToApiResourceNameMap = {
        video: 'videoFile'
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
         * Returns an item type's resource name in the API.
         * @param {string} itemType (e.g. 'video')
         * @returns {string}
         */
        getItemApiResourceName: function(itemType) {
            return angular.isDefined(itemTypeToApiResourceNameMap[itemType]) ? itemTypeToApiResourceNameMap[itemType] : null;
        }
    }
});
