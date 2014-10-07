angular.module('Gapminder').controller('LoginCtrl', ['$scope', '$q', 'UserService', 'NavigationService', function($scope, $q, UserService, NavigationService) {
    /**
     * Sends an authentication request.
     * @returns {Deferred.promise}
     */
    $scope.login = function() {
        var dfd = $q.defer();

        UserService.login($scope.username, $scope.password)
            .then(function(res) {
                UserService.ensureInfo();
                NavigationService.redirect('/');
                dfd.resolve(res);
            }, function(err, status) {
                $scope.errors = err.data.errors;
                dfd.reject(err);
            });

        return dfd.promise;
    };
}]);
