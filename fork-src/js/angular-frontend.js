(function () {
    angular.module('angular-frontend', [
        'env',                          // Exported environment variables
        'ui.router',                    // Routing
        'UserApp',                      // Userapp.io
        'inspinia',                     // Inspinia-theme-related functionality
        'angulartics',                  // angulartics + plugins
        'angulartics.scroll',
        'angulartics.google.analytics',
        'angulartics.mixpanel',
        'angular-frontend-filters'      // angular-frontend-filters.js
    ])
})();