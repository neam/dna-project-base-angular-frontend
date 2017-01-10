var env = require('shared/scripts/env');

import 'bower_components/fontawesome/css/font-awesome.css';
import 'shared/styles/animate.css';

require('jquery');
require('bower_components/bootstrap/dist/js/bootstrap.js'); // requires jQuery
require('bower_components/metisMenu/dist/metisMenu.js');
require('bower_components/slimScroll/jquery.slimscroll.js');
require('bower_components/PACE/pace.js');

var angularFrontend = {
    init: function () {
        //window.optimizelyVariation=$.Deferred();
    }
};

angularFrontend.init();

module.exports = angularFrontend;
