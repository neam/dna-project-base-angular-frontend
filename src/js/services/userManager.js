angular.module('Gapminder').factory('userManager', [
  '$http',
  '$q',
  '$window',
  'api',
  'configManager',
  'promiseFactory',
function(
  $http,
  $q,
  $window,
  api,
  configManager,
  promiseFactory
) {
  var clientId = configManager.get('authClientId');

  return {
    info: null,
    isAuthenticated: false,

    /**
     * Logs out the user.
     */
    logout: function() {
      this.info = null;
      this.deleteAuthToken();
      this.deleteRefreshToken();
      this.isAuthenticated = false;
    },

    /**
     * Logs in the user.
     * @param {string} username
     * @param {string} password
     * @returns {Deferred.promise}
     */
    login: function(username, password) {
      var dfd = promiseFactory.defer(),
        self = this;

      $http.post(api.getApiUrl('/user/login'), {
        grant_type: 'password',
        client_id: clientId,
        username: username,
        password: password
      })
        .then(function(res) {
          self.isAuthenticated = true;
          self.saveAuthToken(res.data.access_token);

          if (angular.isDefined(res.data.refresh_token)) {
            self.saveRefreshToken(res.data.refresh_token);
          }

          dfd.resolve(res);
        }, function(err, status) {
          dfd.reject(status);
        });

      return dfd.promise;
    },

    /**
     * Sends a token-based auto-login request.
     */
    autoLogin: function() {
      var self = this,
        dfd = $q.defer();

      if (!self.isAuthenticated && self.hasAuthToken()) {
        $http.post(api.getApiUrl('/user/authenticate'), {})
          .then(function(res) {
            self.isAuthenticated = true;
            self.ensureInfo();

            dfd.resolve(res);
          }, function(err) {
            dfd.reject(err);
          });
      } else {
        dfd.resolve();
      }

      return dfd.promise;
    },

    /**
     * Refreshes an auth token with a refresh token.
     * @returns {Deferred.promise}
     */
    refreshAuthToken: function() {
      var self = this,
        dfd = promiseFactory.defer(),
        url = api.getApiUrl('/user/login'),
        refreshToken = this.getRefreshToken();

      $http({
        method: 'POST',
        url: url,
        data: {
          client_id: clientId,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        },
        transformRequest: api.serializeFormData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .success(function(res) {
          self.isAuthenticated = true;
          self.saveAuthToken(res.access_token);
          self.saveRefreshToken(res.refresh_token);
          self.ensureInfo();

          dfd.resolve(res);
        })
        .error(function(err) {
          dfd.reject(err);
        });

      return dfd.promise;
    },

    /**
     * Sets the basic user info if not set.
     * @returns {Deferred.promise}
     */
    ensureInfo: function() {
      var self = this,
        dfd = $q.defer();

      if (!this.username) {
        $http.get(api.getApiUrl('/user/info'))
          .then(function(res) {
            self.info = res.data;
            dfd.resolve();
          }, function(err) {
            dfd.reject(err);
          });
      } else {
        dfd.resolve();
      }

      return dfd.promise;
    },

    /**
     * Returns the authentication token.
     * @returns {string}
     */
    getAuthToken: function() {
      return $window.sessionStorage.authToken;
    },

    /**
     * Saves an authentication token.
     * @param {string} token
     */
    saveAuthToken: function(token) {
      $window.sessionStorage.authToken = token;
    },

    /**
     * Checks if the user has saved an authentication token.
     * @returns {boolean}
     */
    hasAuthToken: function() {
      return angular.isDefined(this.getAuthToken());
    },

    /**
     * Deletes the authentication storage.
     */
    deleteAuthToken: function() {
      if (angular.isDefined($window.sessionStorage.authToken)) {
        delete $window.sessionStorage.authToken;
      } else {
        console.info('Authentication token has not been saved.');
      }
    },

    /**
     * Returns a refresh token.
     * @returns {string}
     */
    getRefreshToken: function() {
      return $window.sessionStorage.refreshToken;
    },

    /**
     * Saves a refresh token.
     * @param {string} token
     */
    saveRefreshToken: function(token) {
      $window.sessionStorage.refreshToken = token;
    },

    /**
     * Checks if the user has saved a refresh token.
     * @returns {boolean}
     */
    hasRefreshToken: function() {
      return angular.isDefined(this.getRefreshToken());
    },

    /**
     * Deletes a refresh token.
     */
    deleteRefreshToken: function() {
      if (angular.isDefined($window.sessionStorage.refreshToken)) {
        delete $window.sessionStorage.refreshToken;
      } else {
        console.info('Refresh token has not been saved.');
      }
    }
  }
}]);
