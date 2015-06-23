(function () {
    angular.module('angular-frontend', [
        'ui.router',                    // Routing
        'ngResource',                   // $resource
        'UserApp',                      // Userapp.io
        'inspinia',                     // Inspinia-theme-related functionality
        'angulartics',                  // angulartics + plugins
        'angulartics.scroll',
        'angulartics.google.analytics',
        'angulartics.mixpanel',
        'googlechart',                  // angular-google-chart
        'angularDc',
        'ngHandsontable',
        'ui.ink',
        //'angularJade',
        'angular-frontend-filters'      // angular-frontend-filters.js
    ])
})();