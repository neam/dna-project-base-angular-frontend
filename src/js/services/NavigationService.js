angular.module('Gapminder').factory('NavigationService', [
    '$window',
    '$location',
    '$rootScope',
    '$injector',
    '$sce',
    'utils',
    'i18nService',
    'assetUrl',
    'html5Mode',
function(
    $window,
    $location,
    $rootScope,
    $injector,
    $sce,
    utils,
    i18nService,
    assetUrl,
    html5Mode
) {
    return {
        /**
         * Redirects to the given route.
         * @param {string} url
         */
        redirect: function(url) {
            if (this.isAbsoluteUrl(url)) {
                $window.location.href = url;
            } else {
                $location.path(url);
            }
        },

        /**
         * Redirects to an external URL.
         * @param {string} url
         * @param {jQuery.event} event
         */
        redirectExternal: function(url, event) {
            event.preventDefault();
            this.redirect(url);
        },

        /**
         * Redirects to the return URL.
         */
        redirectToReturnUrl: function() {
            var url = this.getReturnUrl();
            this.redirect(url);
        },

        /**
         * Checks if a URL is absolute.
         * @param {string} url
         * @returns {boolean}
         */
        isAbsoluteUrl: function(url) {
            return _.contains(url, '://');
        },

        /**
         * Reloads the page.
         */
        reload: function() {
            $window.location.reload();
        },

        /**
         * Creates a URL.
         * @param {string} route
         * @returns {string}
         */
        createUrl: function(route) {
            // Return absolute URLs as is
            if (this.isAbsoluteUrl(route)) {
                return route;
            }

            route = utils.ensureLeadingSlash(route);
            return html5Mode ? route : '#' + route;
        },

        /**
         * Creates an asset URL.
         * @param {string} path
         * @returns {string}
         */
        createAssetUrl: function(path) {
            return assetUrl + utils.stripLeadingSlash(path);
        },

        /**
         * Resolves and returns a URL to a template.
         * @param {string} path
         * @returns {string}
         */
        createTemplateUrl: function(path) {
            path = utils.ensureLeadingSlash(path);
            return $sce.trustAsResourceUrl(assetUrl + 'templates' + path);
        },

        /**
         * Creates a URL from state params.
         * @param {string} route the route (e.g. '/exercises/:id')
         * @param {Object} params the route params
         * @returns {string|null}
         */
        createUrlFromStateParams: function(route, params) {
            if (!_.contains(route, '/')) {
                return null;
            }

            _.forEach(params, function(param, key) {
                route = route.replace(':' + key, param);
            });

            return route;
        },

        /**
         * Returns the return URL.
         * @returns {string}
         */
        getReturnUrl: function() {
            return $window.sessionStorage.getItem('returnUrl') || 'http://www.gapminder.org/friends';
        },

        /**
         * Sets the return URL.
         * @param {string} url
         */
        setReturnUrl: function(url) {
            $window.sessionStorage.setItem('returnUrl', url);
        },

        /**
         * Updates the return URL.
         */
        updateReturnUrl: function() {
            var currentUrl = this.getCurrentRoute();

            if (currentUrl !== '/login') {
                this.setReturnUrl(currentUrl);
            }
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
            var path = this.splitPath($location.path().replace(this.getBaseRoute(), '/'));
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
            var states = $injector.get('$state').get(),
                validRoutes = [];

            _.forEach(states, function(state) {
                if (angular.isDefined(state.url)) {
                    var path = state.url.split('/')[1];

                    if (angular.isDefined(path) && !_.contains(validRoutes, path) && path.length > 0) {
                        validRoutes.push(path);
                    }
                }
            });

            return validRoutes;
        },

        /**
         * Checks if the current route matches a route definition (e.g. '/exercises/*', '/presentations/*').
         * @returns {boolean}
         */
        isValidRoute: function() {
            var self = this,
                currentRouteParts = this.getCurrentRoute().split('/'),
                isValid = false;

            angular.forEach(self.getValidRoutes(), function(validRoute) {
                if (_.contains(currentRouteParts, validRoute)) {
                    isValid = true;
                }
            });

            return isValid;
        },

        /**
         * Returns the base route.
         * @returns {string}
         */
        getBaseRoute: function() {
            var route,
                baseRoute,
                firstPathTerm;

            angular.forEach(this.getValidRoutes(), function(route) {
                if (_.contains($location.$$url, route)) {
                    firstPathTerm = route;
                }
            });

            route = _.contains(this.getValidRoutes(), firstPathTerm)
                ? $location.$$absUrl.split(firstPathTerm)[0]
                : $location.$$absUrl; // no route params

            baseRoute = route.replace($location.$$protocol + '://', ''); // strip protocol
            baseRoute = baseRoute.replace($location.$$host, ''); // strip host
            baseRoute = baseRoute.replace(':' + $location.$$port, ''); // strip port
            baseRoute = baseRoute.replace('/#', ''); // strip hashbang

            // TODO: Add regexp to strip /pages-desktop/*/

            if ($location.$$path !== '/') {
                baseRoute = baseRoute.replace($location.$$path, ''); // strip path
            }

            baseRoute = utils.ensureTrailingSlash(baseRoute);

            return baseRoute;
        },

        /**
         * Returns the current route without the base route.
         * @returns {string}
         */
        getCurrentRoute: function() {
            return $location.$$path.replace(this.getBaseRoute(), '/');
        },

        /**
         * Triggers page not found.
         */
        notFound: function() {
            this.setTranslatedPageTitle('not-found', 'Not Found');
            $rootScope.pageNotFound = true;
            $rootScope.layout = 'layout-minimal';
        }
    }
}]);
