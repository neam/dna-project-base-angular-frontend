angular.module('Gapminder').factory('ItemService', [
    '$http',
    '$q',
    '$window',
    '$location',
    'ApiService',
    'NavigationService',
    'Utils',
function(
    $http,
    $q,
    $window,
    $location,
    ApiService,
    NavigationService,
    Utils
) {
    var item;

    return {
        /**
         * Initializes the service.
         * @returns {Deferred.promise}
         */
        init: function() {
            var dfd = $q.defer(),
                fullRoute = $location.$$path.replace(NavigationService.getBaseRoute(), '/'),
                route = this.getItemRoute(fullRoute);

            this.loadItem(route).then(function(page) {
                item = page;
                dfd.resolve(page);
            }, function(err) {
                dfd.reject(err);
            });

            return dfd.promise;
        },

        /**
         * Returns the item route.
         * @param {string} fullRoute
         * @returns {string}
         */
        getItemRoute: function(fullRoute) {
            var route,
                routeParts = fullRoute.split('/');

            route = Utils.ensureLeadingSlash(routeParts[2]);

            return route;
        },

        /**
         * Returns an API URL to the given page.
         * @param {string|number} urlParam
         * @returns {string}
         */
        getPageApiUrl: function(urlParam) {
            // TODO: Move to ApiService.

            var urlParamAsNumber = _.isString(urlParam)
                ? urlParam.replace('/', '')
                : urlParam;

            var identifier = _.isFinite(urlParamAsNumber)
                ? urlParamAsNumber
                : $window.encodeURIComponent(urlParam);

            return ApiService.getApiUrl('/item/' + identifier);
        },

        /**
         * Loads an item item by route (ID).
         * @param {string} route
         * @returns {Deferred.promise}
         */
        loadItem: function(route) {
            var dfd = $q.defer(),
                apiUrl = this.getPageApiUrl(route);

            $http.get(apiUrl)
                .success(function(item) {
                    dfd.resolve(item);
                })
                .error(function(err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }
    };
}]);
