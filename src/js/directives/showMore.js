angular.module('Gapminder').directive('showMore', ['$compile', '$timeout', function($compile, $timeout) {
    return {
        restrict: 'AE',
        scope: {
        },
        templateUrl: 'templates/directives/show-more.html',
        transclude: true,
        link: function(scope, element, attrs, controller, transclude) {
            var contentElement,
                canToggle = true;

            transclude(scope.$parent, function(clone, parentScope) {
                contentElement = clone;
                clone.attr('ng-class', "{ 'show-more-collapsed': isCollapsed() }");
                element.prepend(clone);
                $compile(element.contents())(scope);
            });

            /**
             * Checks if the content is collapsed.
             * @returns {boolean}
             */
            scope.isCollapsed = function() {
                return scope.tooLong() && !scope.showingMore;
            };

            /**
             * Checks if the content element exceeds the max. height.
             * @returns {boolean}
             */
            scope.tooLong = function() {
                return contentElement.height() > 130;
            };

            /**
             * Toggles the showing more state.
             */
            scope.toggleShowMore = function() {
                if (canToggle) {
                    canToggle = false;

                    if (scope.showingMore) {
                        scope.showingMore = false;
                        delete scope.buttonLabel;
                    } else {
                        scope.showingMore = true;
                        scope.buttonLabel = 'Show Less...';
                    }

                    $timeout(function() {
                        canToggle = true;
                    }, 500); // TODO: Find out why scope.toggleShowMore() is called twice.
                }
            };
        }
    };
}]);
