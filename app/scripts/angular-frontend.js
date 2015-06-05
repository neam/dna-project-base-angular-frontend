(function () {
    angular.module('angular-frontend', [
        'ui.router',                    // Routing
        'UserApp',                      // Userapp.io
        'inspinia',                     // Inspinia-theme-related functionality
        'angulartics',                  // angulartics + plugins
        'angulartics.scroll',
        'angulartics.google.analytics',
        'angulartics.mixpanel',
        'googlechart',                  // angular-google-chart
        'angularDc',
        'ngHandsontable',
        //'angularJade',
        'angular-frontend-filters'      // angular-frontend-filters.js
    ])
})();