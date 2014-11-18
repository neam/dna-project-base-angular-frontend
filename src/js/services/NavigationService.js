angular.module('Gapminder').factory('NavigationService', [
    '$location',
    '$rootScope',
    '$route',
    '$sce',
    'Utils',
    'i18nService',
    'assetUrl',
    'html5Mode',
function(
    $location,
    $rootScope,
    $route,
    $sce,
    Utils,
    i18nService,
    assetUrl,
    html5Mode
) {
    var overriddenBaseRoute;

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
            return assetUrl + Utils.stripLeadingSlash(path);
        },

        /**
         * Resolves and returns a URL to a template.
         * @param {string} path
         * @returns {string}
         */
        createTemplateUrl: function(path) {
            path = Utils.ensureLeadingSlash(path);
            return $sce.trustAsResourceUrl(assetUrl + 'templates' + path);
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
                translation = i18nService.translate(i18nString, {}, fallback);

            this.setPageTitle(translation);
        },

        /**
         * Returns an array of valid paths (first terms only).
         * @returns {Array}
         */
        getValidRoutes: function() {
            var validRoutes = [];

            _.forEach($route.routes, function(route, path) {
                var path = path.split('/')[1];

                if (angular.isDefined(path) && !_.contains(validRoutes, path) && path.length > 0) {
                    validRoutes.push(path);
                }
            });

            return validRoutes;
        },

        /**
         * Returns the base route.
         * @returns {string}
         */
        getBaseRoute: function() {
            var route,
                baseRoute,
                firstPathTerm;

            if (overriddenBaseRoute) {
                return overriddenBaseRoute;
            }

            angular.forEach(this.getValidRoutes(), function(route) {
                if (_.contains($location.$$url, route)) {
                    firstPathTerm = route;
                }
            });

            route = _.contains(this.getValidRoutes(), firstPathTerm)
                ? $location.$$absUrl.split(firstPathTerm)[0]
                : $location.$$absUrl; // no route params

            baseRoute = route
                .replace($location.$$protocol + '://', '') // strip protocol
                .replace($location.$$host, '') // strip host
                .replace(':' + $location.$$port, '') // strip port
                .replace('/#', ''); // strip hashbang

            return baseRoute;
        },

        /**
         * Overrides the base route.
         */
        overrideBaseRoute: function() {
            overriddenBaseRoute = Utils.ensureTrailingSlash($location.$$absUrl
                .replace($location.$$path, '') // strip path
                .replace($location.$$protocol + '://', '') // strip protocol
                .replace($location.$$host, '') // strip host
                .replace(':' + $location.$$port, '') // strip port
                .replace('/#', ''));
        },

        /**
         * Resets the base route.
         */
        resetBaseRoute: function() {
            overriddenBaseRoute = null;
        }
    }
}]);
