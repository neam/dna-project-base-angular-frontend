angular.module('Gapminder').factory('CustomPageService', [
    '$q',
    '$http',
    'ApiService',
function(
    $q,
    $http,
    ApiService
) {
    var item;

    /**
     * Loads a page item by route (ID).
     * @param {string} route
     * @returns {Deferred.promise}
     */
    function loadPage(route) {
        var dfd = $q.defer(),
            apiUrl = '/item/:route'.replace(':route', encodeURIComponent(route));

        $http.get(ApiService.getApiUrl(apiUrl))
            .success(function(page) {
                dfd.resolve(page);
            })
            .error(function(err) {
                dfd.reject(err);
            });

        return dfd.promise;
    }

    return {
        /**
         * Initializes the service.
         * @param {string} route
         * @returns {Deferred.promise}
         */
        init: function(route) {
            var dfd = $q.defer();

            loadPage(route).then(function(page) {
                item = page;
                dfd.resolve(page);
            });

            return dfd.promise;
        },

        /**
         * Returns the loaded page item.
         * @returns {}
         */
        getItem: function() {
            return item;
        }
    };
}]);
