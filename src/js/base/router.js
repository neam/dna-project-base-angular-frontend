angular.module('Gapminder').run([
    '$rootScope',
    '$location',
    '$window',
    'UserService',
    'NavigationService',
function(
    $rootScope,
    $location,
    $window,
    UserService,
    NavigationService
) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        NavigationService.resetBaseRoute();
        $rootScope.pageNotFound = false;

        // Attempt to auto-login
        UserService.autoLogin()
            .finally(function() {
                // Redirect to login if login required and not logged in
                if (nextRoute !== null
                    && nextRoute.access !== null
                    && nextRoute.access.requiredLogin
                    && !UserService.isAuthenticated)
                {
                    $location.path('/login');
                }
            });
    });

    $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
        if (angular.isDefined(nextRoute) && angular.isDefined(nextRoute.$$route)) {
            // Update current controller
            $rootScope.controller = nextRoute.$$route.controller;

            // Update page title
            $rootScope.pageTitle = nextRoute.$$route.title;

            // Update page layout
            $rootScope.layout = nextRoute.$$route.layout;
        } else {
            // Custom pages
            $rootScope.layout = 'layout-regular';
        }
    });
}]);
