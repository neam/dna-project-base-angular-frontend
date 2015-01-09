angular.module('Gapminder').directive('itemSplash', ['urlManager', 'sirTrevor', function(urlManager, sirTrevor) {
  return {
    restrict: 'AE',
    scope: {
      blocks: '='
    },
    link: function(scope, element, attrs) {
      scope.$watch('blocks', function() {
        if (angular.isObject(scope.blocks)) {
          var validSplashBlockTypes = ['image', 'linked-image', 'video', 'slideshare'],
              html = '',
              firstBlock = scope.blocks[0],
              containsSlideShare = false;

          if (_.contains(validSplashBlockTypes, firstBlock.type) && sirTrevor.isBlockTypeSupported(firstBlock.type)) {
            if (firstBlock.type === 'slideshare') {
              containsSlideShare = true;
            }

            html += '<div class="block block-{{type}}">'.replace('{{type}}', firstBlock.type);
            html += sirTrevor.render(firstBlock);
            html += '</div>';

            // Prevent re-rendering
            _.remove(scope.blocks, firstBlock); // TODO: Improve this.
          }

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
