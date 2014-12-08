angular.module('Gapminder').factory('WildcardPageService', [
    '$q',
    '$http',
    '$window',
    '$location',
    'ApiService',
function(
    $q,
    $http,
    $window,
    $location,
    ApiService
) {
    var item;

    return {
        /**
         * Initializes the service.
         * @returns {Deferred.promise}
         */
        init: function() {
            var dfd = $q.defer(),
                itemRoute = $location.$$path;

            this.loadItemByRoute(itemRoute).then(function(page) {
                item = page;
                dfd.resolve(page);
            }, function(err) {
                dfd.reject(err);
            });

            return dfd.promise;
        },

        /**
         * Returns an API URL to the given page.
         * @param {string|number} urlParam
         * @returns {string}
         */
        getPageApiUrl: function(urlParam) {
            var urlParamAsNumber = _.isString(urlParam)
                    ? urlParam.replace('/', '')
                    : urlParam;

            var identifier = _.isFinite(urlParamAsNumber)
                    ? urlParamAsNumber
                    : $window.encodeURIComponent(urlParam);

            return ApiService.getApiUrl('/item/' + identifier);
        },

        /**
         * Loads an item by route (ID).
         * @param {string} route
         * @returns {Deferred.promise}
         */
        loadItemByRoute: function(route) {
            var dfd = $q.defer(),
                apiUrl = this.getPageApiUrl(route);

            $http.get(apiUrl)
                .success(function(page) {
                    dfd.resolve(page);
                })
                .error(function(err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }
    };
}]);
