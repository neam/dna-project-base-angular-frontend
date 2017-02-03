'use strict';

import uiRouter from 'angular-ui-router';
import 'angular-ui-router/release/stateEvents';

let module = angular
    .module('ui-router-polyfill-wrapper', [
        uiRouter,
        'ui.router.state.events',
    ]);

export default module;
