(function () {
    angular.module('app', [
        'env',                          // Exported environment variables
        'dna',                          // The DNA files
        'ui.router',                    // Routing
        'UserApp',                      // Userapp.io
        'inspinia'                      // Inspinia-theme-related functionality
    ])
})();