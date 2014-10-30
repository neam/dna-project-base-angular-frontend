angular.module('Gapminder').directive('sirTrevorBlocks', ['SirTrevorService', function(SirTrevorService) {
    return {
        restrict: 'AE',
        scope: {
            blocks: '=',
            about: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('blocks', function() {
                if (angular.isObject(scope.blocks)) {
                    var html = '';

                    angular.forEach(scope.blocks, function(block) {
                        if (SirTrevorService.isBlockTypeSupported(block.type)) {
                            html += '<div class="block block-{{type}}">'.replace('{{type}}', block.type);
                            html += SirTrevorService.render(block);
                            html += '</div>';
                        }
                    });

                    element.html(html).find('a').attr('target', '_blank');
                }
            });
        }
    };
}]);
