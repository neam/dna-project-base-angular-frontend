angular.module('Gapminder').factory('PromiseFactory', ['$q', function($q) {
    return {
        /**
         * Adds success and error helper methods to a promise object.
         * @param {Deferred.promise} promise
         */
        decorate: function(promise) {
            promise.success = function(callback) {
                promise.then(callback);
                return promise;
            }

            promise.error = function(callback) {
                promise.then(null, callback);
                return promise;
            }
        },

        /**
         * Returns the deferred object.
         * @returns {Deferred.promise}
         */
        defer: function() {
            var deferred = $q.defer();
            this.decorate(deferred.promise);
            return deferred;
        }
    };
}]);
