'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).

  // This directive highlightes the current route in the menu
  directive('menuItem', ['$rootScope', '$location', function($rootScope, $location) {
    return function(scope, elm, attrs) {
    	var render = function() {
	      if ($location.path().indexOf(elm.attr('href').replace('#', '')) == 0) {
	      	elm.css('font-weight', 'bold');
	      } else {
	      	elm.css('font-weight', 'normal');
	      }
	    };

			$rootScope.$on('$locationChangeSuccess', function() {
				render();
			});

			render();
    };
  }]);
