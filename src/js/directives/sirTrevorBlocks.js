angular.module('Gapminder').directive('sirTrevorBlocks', ['$compile', 'SirTrevorService', function($compile, SirTrevorService) {
    return {
        restrict: 'AE',
        scope: {
            blocks: '=',
            about: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('blocks', function() {
                if (angular.isObject(scope.blocks)) {
                    var html = '',
                        containsSlideShare = false;

                    angular.forEach(scope.blocks, function(block) {
                        if (SirTrevorService.isBlockTypeSupported(block.type)) {
                            // TODO: Try to get rid of this if-else statement.
                            if (block.type === 'about') {
                                html += '<show-more>';
                                html += '<div class="item-about">' + scope.about + '</div>';
                                html += '</show-more>';
                            } else {
                                if (block.type === 'slideshare') {
                                    containsSlideShare = true;
                                }

                                html += '<div class="block block-{{type}}">'.replace('{{type}}', block.type);
                                html += SirTrevorService.render(block);
                                html += '</div>';
                            }
                        }
                    });

                    html = angular.element(html);

                    $compile(html)(scope);

                    element.html(html).find('a').attr('target', '_blank');

                    // TODO: Run FitVids elsewhere. Refactor and clean up.
                    if (containsSlideShare) {
                        $('.block-slideshare').fitVids({ customSelector: 'iframe'});
                    }
                }
            });
        }
    };
}]);
