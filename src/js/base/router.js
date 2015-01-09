angular.module('Gapminder').run([
    '$rootScope',
    '$location',
    '$window',
    'urlManager',
    'userManager',
    'deviceRedirector',
function(
    $rootScope,
    $location,
    $window,
    urlManager,
    userManager,
    deviceRedirector
) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        deviceRedirector.run();

        delete $rootScope.metaDescription;
        $rootScope.pageNotFound = false;

        urlManager.updateReturnUrl();

        // Attempt to auto-login
        userManager.autoLogin()
            .finally(function() {
                // Redirect to login if login required and not logged in
                if (toState !== null
                    && toState.access !== null
                    && toState.access.requiredLogin
                    && !userManager.isAuthenticated)
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
