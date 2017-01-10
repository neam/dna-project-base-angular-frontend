/**
 * INSPINIA - Responsive Admin Theme
 */

'use strict';

require('oclazyload/dist/ocLazyLoad.js');

let deps = [
    require('angular-ui-router').default,                    // Routing
    //'oc.lazyLoad',                  // ocLazyLoad
    (() => {
        require('angular-bootstrap');
        return 'ui.bootstrap'
    })(),                  // Ui Bootstrap
    require('angular-translate'),       // Angular Translate
    require('ng-idle'),                       // Idle timer
    require('angular-sanitize')                    // ngSanitize
    // Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
];

let inspinia = angular.module('inspinia', deps);

require('./controllers');
require('./directives');

export default inspinia;
