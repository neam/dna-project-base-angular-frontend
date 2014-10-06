angular.module('Gapminder').controller('NavbarCtrl', ['$scope', 'UserService', 'NavigationService', function($scope, UserService, NavigationService) {
    /**
     * Logs out the user.
     */
    $scope.logout = function() {
        UserService.logout();
        NavigationService.redirect('/');
    };

    /**
     * Returns the username.
     * @returns {string}
     */
    $scope.getUsername = function() {
        return UserService.info ? UserService.info.username : '';
    };
}]);
