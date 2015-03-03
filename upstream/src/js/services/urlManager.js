angular.module('Gapminder').factory('urlManager', function($window, $location, $rootScope, $injector, $sce, core, utils, uiTranslator, ASSET_URL, TESTING, VERSION, BUILD_HASH, HTML5_MODE, CANONICAL_BASE_URL, MOBILE_BASE_URL) {
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
      return HTML5_MODE ? route : '#' + route;
    },

    /**
     * Creates an asset URL.
     * @param {string} path
     * @returns {string}
     */
    createAssetUrl: function(path) {
      return ASSET_URL + utils.stripLeadingSlash(path);
    },

    /**
     * Resolves and returns a URL to a template.
     * @param {string} path
     * @returns {string}
     */
    createTemplateUrl: function(path) {
      var cacheBusterString = VERSION + '-' + BUILD_HASH;
      return core.createTemplateUrl(path, cacheBusterString, ASSET_URL, TESTING);
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
     * Creates a canonical URL.
     * @param {string} route
     * @returns {string}
     */
    createCanonicalUrl: function(route) {
      var hashbang = HTML5_MODE ? '' : '/#';
      return this.getCanonicalBaseUrl() + hashbang + utils.ensureLeadingSlash(route);
    },

    /**
     * Sets the prerender headers.
     * @param {number} status
     * @param {Object} item
     */
    setPrerenderHeaders: function(status, item) {
      if (angular.isDefined(item.url)) {
        if (this.isCurrentItemUrlCanonical(item)) {
          $rootScope.prerenderStatusCode = status;
          delete $rootScope.prerenderHeader;
        } else {
          $rootScope.prerenderStatusCode = 302;
          $rootScope.prerenderHeader = 'Location: ' + this.createCanonicalUrl(item.url);
        }
      }
    },

    /**
     * Checks if the current URL is canonical based on the given item.
     * @param {Object} item
     * @returns {boolean}
     */
    isCurrentItemUrlCanonical: function(item) {
      if (angular.isDefined(item.url) && item.url) {
        return this.getCurrentAbsoluteUrl() === this.createCanonicalUrl(item.url);
      } else {
        return false;
      }
    },

    /**
     * Returns the mobile base URL.
     * @returns {string}
     */
    getMobileBaseUrl: function() {
      return MOBILE_BASE_URL;
    },

    /**
     * Returns a mobile URL for the current page.
     * @returns {string}
     */
    getMobileUrl: function() {
      return this.getMobileBaseUrl() + this.getCurrentRoute();
    },

    /**
     * Returns the canonical base URL.
     * @returns {string}
     */
    getCanonicalBaseUrl: function() {
      return CANONICAL_BASE_URL;
    },

    /**
     * Returns a canonical URL for the current page.
     * @returns {string}
     */
    getCanonicalUrl: function() {
      return this.getCanonicalBaseUrl() + this.getCurrentRoute();
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
          translation = uiTranslator.translate(i18nString, {}, fallback);

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
     * Returns the current absolute URL.
     * @returns {string}
     */
    getCurrentAbsoluteUrl: function() {
      return $location.$$absUrl;
    },

    /**
     * Updates the pushstate.
     * @param {Object} item
     */
    replaceState: function(item) {
      if (!this.isCurrentItemUrlCanonical(item)) {
        $location.replace();
        $location.path(item.url);
      }
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
});