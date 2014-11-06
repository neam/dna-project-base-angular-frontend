angular.module('Gapminder').factory('NavigationService', [
    '$location',
    '$rootScope',
    'Utils',
    'i18nService',
    'environment',
    'html5Mode',
function(
    $location,
    $rootScope,
    Utils,
    i18nService,
    environment,
    html5Mode
) {
    return {
        /**
         * Redirects to the given route.
         * @param {string} route
         */
        redirect: function(route) {
            $location.path(route);
        },

        /**
         * Creates a URL.
         * @param {string} route
         * @returns {string}
         */
        createUrl: function(route) {
            route = Utils.ensureLeadingSlash(route);
            return html5Mode ? route : '#' + route;
        },

        /**
         * Creates an asset URL.
         * @param {string} path
         * @returns {string}
         */
        createAssetUrl: function(path) {
            return Utils.stripLeadingSlash(path);
        },

        /**
         * Splits a URL path into parts.
         * @param {string} path
         * @returns {Array}
         */
        splitPath: function(path) {
            var pathWithoutLeadingSlash = path.charAt(0) === '/' ? path.substr(1) : path;
            return pathWithoutLeadingSlash.split('/');
        },

        /**
         * Returns the given part of the URL path by array index.
         * @param {number} index
         * @returns {string}
         */
        getPartOfPath: function(index) {
            var path = this.splitPath($location.path());
            return angular.isDefined(path[index]) ? path[index] : null;
        },

        /**
         * Sets the page title.
         * @param {} title
         * @returns {boolean}
         */
        setPageTitle: function(title) {
            $rootScope.pageTitle = title;
        },

        /**
         * Translates a page title and sets it.
         * @param {string} i18nKey
         * @param {string} fallback
         */
        setTranslatedPageTitle: function(i18nKey, fallback) {
            var i18nString = 'page-title:{key}'.replace('{key}', i18nKey),
                translation = i18nService.translate(i18nString, fallback);

            this.setPageTitle(translation);
        }
    }
}]);
