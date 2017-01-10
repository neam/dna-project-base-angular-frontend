'use strict';

let appModule = require('project/index');

angular.bootstrap(document, [appModule.name], { strictDi: true, debugInfoEnabled: true });
