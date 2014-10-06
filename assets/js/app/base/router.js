angular.module('Gapminder').run(function($rootScope, $location, $window, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
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
        if (typeof nextRoute !== 'undefined') {
            // Update current controller
            $rootScope.controller = nextRoute.$$route.controller;

            // Update page title
            $rootScope.pageTitle = nextRoute.$$route.title;

            // Update page layout
            $rootScope.layout = nextRoute.$$route.layout;
        }
    });
});
