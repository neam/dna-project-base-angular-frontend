'use strict';

import 'project/styles/divi-2.1.4-style.css';
//<link rel='stylesheet' id='mediaelement-css'  href='wp-includes/js/mediaelement/mediaelementplayer.min.css@ver=2.15.1.css' type='text/css' media='all' />
//<link rel='stylesheet' id='wp-mediaelement-css'  href='wp-includes/js/mediaelement/wp-mediaelement.css@ver=4.1.css' type='text/css' media='all' />
import 'shared/less/style.less';

// Much easier to debug in Chrome with original exceptions thrown - http://stackoverflow.com/questions/19420604/angularjs-stack-trace-ignoring-source-map
/*
angular.module('source-map-exception-handler', []).config(function($provide) {
  $provide.decorator('$exceptionHandler', function($delegate) {
    return function(exception, cause) {
        $delegate(exception, cause);
        throw exception;
    };
  });
});
*/

let app = require('project/scripts/app');
require('project/scripts/config');
require('project/scripts/translations');

window.optimizelyVariation=$.Deferred();

// Export the angular module that represent ng-app
export default app;
