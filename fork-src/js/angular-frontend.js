(function () {
    angular.module('angular-frontend', [
        'env',                          // Exported environment variables
        'ui.router',                    // Routing
        'UserApp',                      // Userapp.io
        'inspinia',                     // Inspinia-theme-related functionality
        'angular-frontend-filters'      // angular-frontend-filters.js
    ])
})();