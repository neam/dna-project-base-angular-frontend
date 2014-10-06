angular.module('Gapminder').controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService) {
    $scope.user = UserService;
}]);
