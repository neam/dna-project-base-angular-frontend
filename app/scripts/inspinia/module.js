/**
 * INSPINIA - Responsive Admin Theme
 *
 */

'use strict';

export default require('angular').module('inspinia', [
    require('angular-ui-router'),                    // Routing
    (() => {
        require('oclazyload/dist/ocLazyLoad.js');
        return 'oc.lazyLoad'
    })(),                  // ocLazyLoad
    require('angular-bootstrap'),                 // Ui Bootstrap
    require('angular-translate'),       // Angular Translate
    require('ng-idle'),                       // Idle timer
    require('angular-sanitize')                    // ngSanitize
]);

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
