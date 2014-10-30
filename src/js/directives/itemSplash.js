angular.module('Gapminder').directive('itemSplash', ['NavigationService', 'SirTrevorService', function(NavigationService, SirTrevorService) {
    return {
        restrict: 'AE',
        scope: {
            blocks: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('blocks', function() {
                if (angular.isObject(scope.blocks)) {
                    var html = '',
                        firstBlock = scope.blocks[0];

                    if (SirTrevorService.isBlockTypeSupported(firstBlock.type)) {
                        html += '<div class="block block-{{type}}">'.replace('{{type}}', firstBlock.type);
                        html += SirTrevorService.render(firstBlock);
                        html += '</div>';
                    }

                    // Prevent re-rendering
                    _.remove(scope.blocks, firstBlock); // TODO: Improve this.

                    element.html(html).find('a').attr('target', '_blank');
                }
            });
        }
    };
}]);
