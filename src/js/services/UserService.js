angular.module('Gapminder').factory('UserService', [
    '$http',
    '$q',
    '$window',
    'ApiService',
    'ConfigService',
function(
    $http,
    $q,
    $window,
    ApiService,
    ConfigService
) {
    var clientId = ConfigService.get('authClientId');

    return {
        info: null,
        isAuthenticated: false,

        /**
         * Logs out the user.
         */
        logout: function() {
            this.info = null;
            this.deleteAuthToken();
            this.isAuthenticated = false;
        },

        /**
         * Logs in the user.
         * @param {string} username
         * @param {string} password
         * @returns {Deferred.promise}
         */
        login: function(username, password) {
            var dfd = $q.defer(),
                self = this;

            $http.post(ApiService.getApiUrl('/user/login'), {
                grant_type: 'password',
                client_id: clientId,
                username: username,
                password: password
            })
                .then(function(res) {
                    self.isAuthenticated = true;
                    self.saveAuthToken(res.data.access_token);

                    dfd.resolve(res);
                }, function(err, status) {
                    dfd.reject(err, status);
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
                $http.post(ApiService.getApiUrl('/user/authenticate'), {})
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
         * Sets the basic user info if not set.
         * @returns {Deferred.promise}
         */
        ensureInfo: function() {
            var self = this,
                dfd = $q.defer();

            if (!this.username) {
                $http.get(ApiService.getApiUrl('/user/info'))
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
        }
    }
}]);
