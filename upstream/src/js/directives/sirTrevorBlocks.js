angular.module('Gapminder').directive('sirTrevorBlocks', function($compile, $timeout, sirTrevor) {
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
              containsSlideShare = false,
              containsVimeo = false;

          angular.forEach(scope.blocks, function(block) {
            if (sirTrevor.isBlockTypeSupported(block.type)) {
              // TODO: Try to get rid of these if-else statements.
              if (block.type === 'about') {
                if (angular.isDefined(attrs.about)) {
                  if (angular.isDefined(attrs.aboutShowMore)) {
                    html += '<show-more>';
                  }

                  html += '<div class="item-about">' + scope.about + '</div>';

                  if (angular.isDefined(attrs.aboutShowMore)) {
                    html += '</show-more>';
                  }
                }
              } else {
                if (block.type === 'slideshare') {
                  containsSlideShare = true;
                }

                if (block.type === 'video' && block.data.source === 'vimeo') {
                  containsVimeo = true;
                }

                html += '<div class="block block-{{type}}">'.replace('{{type}}', block.type);
                html += sirTrevor.render(block);
                html += '</div>';
              }
            }
          });

          html = angular.element(html);

          $compile(html)(scope);

          element.html(html).find('a').attr('target', '_blank');

          // TODO: Run elsewhere. Refactor and clean up.
          if (containsSlideShare) {
            $('.block-slideshare').fitVids({customSelector: 'iframe'});
          }

          // TODO: Run elsewhere. Refactor and clean up.
          if (containsVimeo) {
            // TODO: Get rid of the timeout.
            $timeout(function() {
              $('.vimeo-container').fitVids({customSelector: 'iframe'});
            }, 200, false);
          }
        }
      });
    }
  };
});
