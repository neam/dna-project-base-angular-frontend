angular.module('Gapminder').factory('itemManager', function($http, $q, $window, $location, $rootScope, promiseFactory, urlManager, api, utils) {
  return {
    /**
     * Loads an item.
     * @param {string} route
     * @returns {Deferred.promise}
     */
    loadItem: function() {
      var self = this,
          dfd = promiseFactory.defer(),
          apiUrl;

      if (urlManager.isValidRoute()) {
        apiUrl = self.getItemIdentifierFromUrl();
      } else {
        var routeParam = self.getItemRouteParamFromUrl();
        apiUrl = self.getPageApiUrl(routeParam);
      }

      $http.get(apiUrl)
        .success(function(item, status) {
          $rootScope.statusCode = status;
          self.setMetaDescriptionFromItem(item);
          dfd.resolve(item);
        })
        .error(function(err, status) {
          $rootScope.statusCode = status;
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
      var fullRoute = urlManager.getCurrentRoute();
      return utils.ensureLeadingSlash(fullRoute);
    },

    /**
     * Returns the item identifier param (node_id or route) from the current URL.
     * @returns {number|string}
     */
    getItemIdentifierFromUrl: function() {
      var fullRoute = urlManager.getCurrentRoute(),
          identifier = fullRoute.split('/')[2]; // TODO: Improve.

      identifier = _.isFinite(identifier)
        ? identifier
        : $window.encodeURIComponent(utils.ensureLeadingSlash(fullRoute));

      return this.createItemApiUrl(identifier);
    },

    /**
     * Creates an API URL for an item.
     * @param {number|string} identifier
     * @returns {string}
     */
    createItemApiUrl: function(identifier) {
      return api.getApiUrl('/item' + utils.ensureLeadingSlash(identifier));
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
     * Creates a link to an item.
     * @param {Object} composition
     * @returns {string}
     */
    createItemUrl: function(composition) {
      if (angular.isDefined(composition.url) && composition.url) {
        // by url
        return composition.url;
      } else {
        // by node_id
        return urlManager.createUrl(api.getCompositionItemPathName(composition.node_id));
      }
    },

    /**
     * Navigates to the profile.
     * @param {number} userId
     * @param {jQuery.Event} event
     */
    goToProfile: function(userId, event) {
      event.preventDefault();
      var url = this.createUserProfileUrl(userId);
      urlManager.redirect(url);
    },

    /**
     * Checks if an item has contributors.
     * @param {Object} item
     * @returns {boolean}
     */
    itemHasContributors: function(item) {
      return angular.isDefined(item) && angular.isDefined(item.contributors) && !_.isEmpty(item.contributors);
    },

    /**
     * Removes an admin contributor from an item.
     * @param {Object} item
     */
    removeAdminContributorFromItem: function(item) {
      if (angular.isDefined(item) && angular.isDefined(item.contributors)) {
        angular.forEach(item.contributors, function(contributor) {
          if (parseInt(contributor.user_id) === 1) {
            _.remove(item.contributors, contributor);
          }
        });
      }
    },

    /**
     * Sets the meta description based on item data.
     * @param {Object} item
     */
    setMetaDescriptionFromItem: function(item) {
      var text = null;

      if (angular.isDefined(item.attributes)) {
        if (angular.isDefined(item.attributes.about)) {
          text = utils.htmlToPlainText(item.attributes.about);
        } else if (angular.isDefined(item.attributes.subheading)) {
          text = utils.htmlToPlainText(item.attributes.subheading);
        }
      }

      $rootScope.metaDescription = text;
    }
  };
});
