angular.module('Gapminder').factory('CustomPageService', [
    '$q',
    '$http',
    '$window',
    'ApiService',
function(
    $q,
    $http,
    $window,
    ApiService
) {
    var item;

    return {
        /**
         * Initializes the service.
         * @param {string} route
         * @returns {Deferred.promise}
         */
        init: function(route) {
            var dfd = $q.defer();

            this.loadPage(route).then(function(page) {
                item = page;
                dfd.resolve(page);
            }, function(err) {
                dfd.reject(err);
            });

            return dfd.promise;
        },

        /**
         * Returns an API URL to the given page.
         * @param {string|number} identifier
         * @returns {string}
         */
        getPageApiUrl: function(identifier) {
            var identifierAsNumber = _.isString(identifier)
                    ? identifier.replace('/', '')
                    : identifier;

            var url = identifierAsNumber > 0 // check if the identifier is a number
                    ? identifierAsNumber
                    : $window.encodeURIComponent(identifier);

            return ApiService.getApiUrl('/item/' + url);
        },

        /**
         * Loads a page item by route (ID).
         * @param {string} route
         * @returns {Deferred.promise}
         */
        loadPage: function(route) {
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
