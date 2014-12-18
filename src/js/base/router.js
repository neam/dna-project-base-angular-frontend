angular.module('Gapminder').run([
    '$rootScope',
    '$location',
    '$window',
    'NavigationService',
    'UserService',
    'DeviceRedirectService',
function(
    $rootScope,
    $location,
    $window,
    NavigationService,
    UserService,
    DeviceRedirectService
) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        DeviceRedirectService.run();

        delete $rootScope.metaDescription;
        $rootScope.pageNotFound = false;

        NavigationService.updateReturnUrl();

        // Attempt to auto-login
        UserService.autoLogin()
            .finally(function() {
                // Redirect to login if login required and not logged in
                if (toState !== null
                    && toState.access !== null
                    && toState.access.requiredLogin
                    && !UserService.isAuthenticated)
                {
                    $location.path('/login');
                }
            });
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState)) {
            // Update current controller
            $rootScope.controller = toState.controller;

            // Update page layout
            $rootScope.layout = toState.layout;
        } else {
            // Custom pages
            $rootScope.layout = 'layout-regular';
        }
    });
}]);
