angular.module('Gapminder').factory('ItemService', [
    '$http',
    '$q',
    '$window',
    '$location',
    'NavigationService',
    'ApiService',
    'Utils',
function(
    $http,
    $q,
    $window,
    $location,
    NavigationService,
    ApiService,
    Utils
) {
    return {
        /**
         * Loads an item.
         * @param {string} route
         * @returns {Deferred.promise}
         */
        loadItem: function() {
            var self = this,
                dfd = $q.defer(),
                apiUrl;

            if (NavigationService.isValidRoute()) {
                apiUrl = self.getItemIdentifierFromUrl();
            } else {
                var routeParam = self.getItemRouteParamFromUrl();
                apiUrl = self.getPageApiUrl(routeParam);
            }

            $http.get(apiUrl)
                .success(function(item) {
                    dfd.resolve(item);
                })
                .error(function(err) {
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

            return this.createItemApiUrl(identifier);
        },

        /**
         * Returns the item route param from the current URL.
         * @returns {string}
         */
        getItemRouteParamFromUrl: function() {
            var fullRoute = NavigationService.getCurrentRoute();
            return Utils.ensureLeadingSlash(fullRoute);
        },

        /**
         * Returns the item identifier param (node_id or route) from the current URL.
         * @returns {number|string}
         */
        getItemIdentifierFromUrl: function() {
            var fullRoute = NavigationService.getCurrentRoute(),
                identifier = fullRoute.split('/')[2]; // TODO: Improve.

            identifier = _.isFinite(identifier)
                ? identifier
                : $window.encodeURIComponent(Utils.ensureLeadingSlash(fullRoute));

            return this.createItemApiUrl(identifier);
        },

        /**
         * Creates an API URL for an item.
         * @param {number|string} identifier
         * @returns {string}
         */
        createItemApiUrl: function(identifier) {
            return ApiService.getApiUrl('/item' + Utils.ensureLeadingSlash(identifier));
        },

        /**
         * Creates a link to a user profile page.
         * @param {number} userId
         * @returns {string}
         */
        createUserProfileUrl: function(userId) {
            return 'http://www.gapminder.org/profiles/' + userId;
        },

        /**
         * Navigates to the profile.
         * @param {number} userId
         * @param {jQuery.Event} event
         */
        goToProfile: function(userId, event) {
            event.preventDefault();
            var url = this.createUserProfileUrl(userId);
            NavigationService.redirect(url);
        }
    };
}]);
