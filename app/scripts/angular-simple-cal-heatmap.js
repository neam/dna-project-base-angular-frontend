'use strict';

let module = angular.module('angular-simple-cal-heatmap', []);

require('bower_components/cal-heatmap/cal-heatmap.css');
let CalHeatMap = require('bower_components/cal-heatmap/cal-heatmap.js');

/**
 * Simple cal heatmap wrapper directive which simply sends the config to CalHeatMap's init() function
 * together with the element reference
 */
module
    .directive('simpleCalHeatmap', function () {

        var heatmap;

        function update(data) {
            heatmap.update(data);
        }

        function link(scope, el) {
            var config = angular.copy(scope.config);
            var element = el[0];
            heatmap = new CalHeatMap();
            config.itemSelector = element;
            heatmap.init(config);
            scope.$watchCollection('config.data', function (newVal, oldVal) {
                update(newVal);
            });
        }

        return {
            template: '<div id="cal-heatmap" config="config"></div>',
            restrict: 'E',
            link: link,
            scope: {config: '='}
        };
    });

export default module;