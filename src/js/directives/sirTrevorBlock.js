angular.module('Gapminder').directive('sirTrevorBlock', ['$location', function($location) {
    // Map supported block types to renderer functions
    var blockToRendererFnMap = {
        text: renderText,
        heading: renderHeading,
        image: renderImage,
        list: renderList,
        quote: renderQuote,
        video: renderVideo,
        slideshare: renderSlideShare
    };

    return {
        restrict: 'AE',
        scope: {
            data: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('data', function() {
                if (angular.isObject(scope.data) && angular.isObject(scope.data.data)) {
                    var html = '';

                    angular.forEach(scope.data.data, function(block) {
                        html += '<div class="block block-{{type}}">'.replace('{{type}}', block.type);
                        html += blockToRendererFnMap[block.type](block);
                        html += '</div>';
                    });

                    element.html(html).find('a').attr('target', '_blank');
                }
            });
        }
    };

    /**
     * Renders a text block and returns the HTML.
     * @param {} block
     * @returns {string}
     */
    function renderText(block) {
        return marked(block.data.text);
    }

    /**
     * Renders a heading block and returns the HTML.
     * @param {} block
     * @returns {string}
     */
    function renderHeading(block) {
        return marked('### ' + block.data.text);
    }

    /**
     * Renders an image block and returns the HTML.
     * @param {} block
     * @returns {string}
     */
    function renderImage(block) {
        return '<img src="{{file_url}}"/>'.replace('{{file_url}}', block.data.file.url);
    }

    /**
     * Renders a list block and returns the HTML.
     * @param {} block
     * @returns {string}
     */
    function renderList(block) {
        return marked(block.data.text);
    }

    /**
     * Renders a blockquote and returns the HTML.
     * @param {} block
     * @returns {string}
     */
    function renderQuote(block) {
        var cite = '';
        if (angular.isDefined(block.data.cite)) {
            cite = '<cite>' + marked(block.data.cite) + '</cite>';
        }
        var blockquote = marked(block.data.text);
        return blockquote.replace('</blockquote>', cite + '</blockquote>');
    }

    /**
     * Renders a video block and returns the HTML.
     * @param {} block
     * @returns {string}
     */
    function renderVideo(block) {
        var providers = {
                vimeo: {
                    src: "{{protocol}}://player.vimeo.com/video/{{remote_id}}",
                    html: "<iframe src=\"{{src}}?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
                },
                youtube: {
                    src: "{{protocol}}://www.youtube.com/embed/{{remote_id}}",
                    html: "<iframe src=\"{{src}}\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>"
                }
            },
            src = providers[block.data.source]
                .src
                .replace('{{protocol}}', $location.protocol())
                .replace('{{remote_id}}', block.data.remote_id),
            iframe = providers[block.data.source].html
                .replace('{{src}}', src);

        return iframe;
    }

    /**
     * Renders a SlideShare block.
     * @param {} block
     * @returns {string}
     */
    function renderSlideShare(block) {
        var html = "<iframe src=\"http://www.slideshare.net/slideshow/embed_code/{{remote_id}}?rel=0\" width=\"425\" height=\"355\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;\" allowfullscreen> </iframe>"
            .replace('{{remote_id}}', block.data.remote_id);

        return html;
    }
}]);
