'use strict';

let env = require('shared/scripts/env');

require('bower_components/jquery-ui/jquery-ui.js');
require('bower_components/angular-resource/angular-resource.js');

// Narrative NRTV CSS
//require('styles/narrative-nrtv.css');

// Code Mirror
require('bower_components/codemirror/lib/codemirror.css');
//require('bower_components/codemirror/ambiance.css');

// dc
require('styles/dc.css');

// Handsontable
require('bower_components/handsontable/dist/handsontable.full.css');

// Angular hotkeys
require('bower_components/angular-hotkeys/src/hotkeys.css');

// Date Range Picker for Bootstrap
require('bower_components/bootstrap-daterangepicker/daterangepicker.css');

// Cal Heatmap
require('bower_components/cal-heatmap/cal-heatmap.css');

// These assets break when built, thus excluding from build currently

// Angular colorpicker
require('bower_components/angular-bootstrap-colorpicker/css/colorpicker.css');

// Intro.js
require('bower_components/intro.js/introjs.css');

// Select2
require('bower_components/select2/dist/css/select2.min.css');

// iCheck
require('bower_components/iCheck/skins/square/green.css');

// Fullcalendar
require('bower_components/fullcalendar/dist/fullcalendar.css');

// floatThead
require('bower_components/jquery.floatThead/dist/jquery.floatThead.js');

// More vendor scripts
require('bower_components/lodash/dist/lodash.min.js');
require('bower_components/d3/d3.min.js');
require('scripts/inspinia/plugins/rickshaw/rickshaw.min.js');
require('bower_components/crossfilter/crossfilter.min.js');
require('bower_components/dcjs/dc.min.js');
require('scripts/inspinia/plugins/sparkline/jquery.sparkline.min.js');

// Cal Heatmap
require('bower_components/cal-heatmap/cal-heatmap.js');

require('bower_components/angular-dc/src/angular-dc.js');
require('scripts/dc/dc-nasdaq-controller.js');
require('scripts/dc/angular-jade-min.js');
require('scripts/inspinia/plugins/rickshaw/angular-rickshaw.js');
require('bower_components/angular-google-chart/ng-google-chart.js');
require('bower_components/angulartics/dist/angulartics.min.js');
require('bower_components/angulartics/dist/angulartics-scroll.min.js');
require('bower_components/angulartics/dist/angulartics-ga.min.js');
require('bower_components/angulartics/dist/angulartics-mixpanel.min.js');
require('bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js');
require('bower_components/ng-videosharing-embed/build/ng-videosharing-embed.min.js');

// Angular Narrative API
require('bower_components/angular-narrative-api/dist/angular-narrative-api.js');

// Angular Color Picker (angular-minicolors)
require('bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js');

// Intro.js
require('bower_components/intro.js/intro.js');

// 3-way-merge
require('scripts/angular-3-way-merge/merge.js');

// Select2
require('bower_components/select2/dist/js/select2.js');

// Angular Select2
require('bower_components/angular-select2/dist/angular-select2.js');

// Handsontable
let Handsontable = require('bower_components/handsontable/dist/handsontable.full.js');
require('bower_components/ruleJS/dist/full/ruleJS.all.full.js');
require('bower_components/handsontable-ruleJS/src/handsontable.formula.js');

// Necessary for ngHandsontable to accept the "formulas" setting
console.log('Handsontable loaded?', Handsontable);
Handsontable.DefaultSettings.prototype.formulas = {};

require('bower_components/angular-simple-handsontable/angular-simple-handsontable.js');

// Handsontable-select2-editor
require('bower_components/Handsontable-select2-editor/select2-editor.js');

// iCheck
require('bower_components/iCheck/icheck.js');

// Angular hotkeys
require('bower_components/mousetrap/mousetrap.js');
require('bower_components/angular-hotkeys/src/hotkeys.js');

// dc
require('scripts/dc/colorbrewer.js');
require('scripts/dc/dc-nasdaq-controller.js');

// Moment.js
let moment = require('bower_components/moment/moment.js');
console.log('moment loaded?', moment);

// Workaround for daterangepicker displaying "Invalid date" when start/end of the range is null
moment.locale(moment.locale(), {invalidDate: ""});

// Date Range Picker for Bootstrap
require('bower_components/bootstrap-daterangepicker/daterangepicker.js');
require('bower_components/angular-daterangepicker/js/angular-daterangepicker.js');

// Code Mirror
require('bower_components/codemirror/lib/codemirror.js');
require('bower_components/codemirror/mode/javascript/javascript.js');
require('scripts/inspinia/plugins/ui-codemirror/ui-codemirror.min.js');

// Filepicker.io
require('bower_components/filepicker-js/filepicker.js');
require('bower_components/filepicker-js/filepicker_debug.js');
require('bower_components/angular-filepicker/dist/angular_filepicker.js');

// Angular UI Calendar / Fullcalendar (Note: jquery, moment, and angular have to get included before fullcalendar)
require('bower_components/angular-ui-calendar/src/calendar.js');
require('bower_components/fullcalendar/dist/fullcalendar.js');
require('bower_components/fullcalendar/dist/gcal.js');

// Sections
require('sections/get-started/get-started.js');
require('sections/import-and-inspect/import.js');
//require('sections/get-things-done/get-things-done.js');
require('sections/share/share.js');
require('sections/outsource-and-collaborate/outsource-and-collaborate.js');
/*
require('sections/transactions/transactions.js');
require('sections/business-events/business-events.js');
require('sections/journal-entries/journal-entries.js');
*/
require('sections/up-to-date/up-to-date.js');
require('sections/basic-info/basic-info.js');

// Generated
// insert here...

let dataEnvironmentSpecific = angular
    .module('data-environment-specific', [
        /*
        'ngResource',                   // $resource
        //'modelFactory',                 // angular-model-factory
        //'multiStepForm',                // angular-multi-step-form
        'googlechart',                  // angular-google-chart
        'angularDc',
        //'ngHandsontable',
        'simpleHandsontable',
        'angular-filepicker',
        'cfp.hotkeys',                  // angular-hotkeys
        'ui.calendar',                  // angular-ui-calendar / fullcalendar
        '3-way-merge',                  // 3-way-merge
        'rt.select2',                   // angular-select2
        'daterangepicker',              // angular-daterangepicker
        'smoothScroll',                 // ngSmoothScroll
        'videosharing-embed',
        'colorpicker.module',           //Angular color picker
        'dcNasdaq',                     // necessary for scripts/dc/dc-nasdaq-controller.js
        //'angularJade',
        //'section-get-started',
        //'section-basic-info',
         */
    ]);

require('project/scripts/data-environment-specific.ng-includes.js');

export default dataEnvironmentSpecific;
