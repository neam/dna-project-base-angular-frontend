angular.module('Gapminder').factory('SirTrevorService', [
    '$location',
    'NavigationService',
    'ApiService',
function(
    $location,
    NavigationService,
    ApiService
) {
    var service = {
        /**
         * Renders a text block and returns the HTML.
         * @param {} block
         * @returns {string}
         */
        renderText: function(block) {
            return marked(block.data.text);
        },

        /**
         * Renders a heading block and returns the HTML.
         * @param {} block
         * @returns {string}
         */
        renderHeading: function(block) {
            return marked('### ' + block.data.text);
        },

        /**
         * Renders an image block and returns the HTML.
         * @param {} block
         * @returns {string}
         */
        renderImage: function(block) {
            return '<img src="{{file_url}}"/>'.replace('{{file_url}}', block.data.file.url);
        },

        /**
         * Renders a list block and returns the HTML.
         * @param {} block
         * @returns {string}
         */
        renderList: function(block) {
            return marked(block.data.text);
        },

        /**
         * Renders a blockquote and returns the HTML.
         * @param {} block
         * @returns {string}
         */
        renderQuote: function(block) {
            var cite = '';
            if (angular.isDefined(block.data.cite)) {
                cite = '<cite>' + marked(block.data.cite) + '</cite>';
            }
            var blockquote = marked(block.data.text);
            return blockquote.replace('</blockquote>', cite + '</blockquote>');
        },

        /**
         * Renders a video block and returns the HTML.
         * @param {} block
         * @returns {string}
         */
        renderVideo: function(block) {
            var providers = {
                    vimeo: {
                        src: "{{protocol}}://player.vimeo.com/video/{{remote_id}}",
                        html: "<iframe src=\"{{src}}?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
                    },
                    youtube: {
                        src: "{{protocol}}://www.youtube.com/embed/{{remote_id}}",
                        html: "<div class=\"item-video youtube-container\"><iframe src=\"{{src}}\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe></div>"
                    }
                },
                src = providers[block.data.source]
                    .src
                    .replace('{{protocol}}', $location.protocol())
                    .replace('{{remote_id}}', block.data.remote_id),
                iframe = providers[block.data.source].html
                    .replace('{{src}}', src);

            return iframe;
        },

        /**
         * Renders a SlideShare block.
         * @param {} block
         * @returns {string}
         */
        renderSlideShare: function(block) {
            var html = '<iframe src="http://www.slideshare.net/slideshow/embed_code/{{remote_id}}?rel=0" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>';
            html = html.replace('{{remote_id}}', block.data.remote_id);
            return html;
        },

        /**
         * Renders an about block.
         * @param {} block
         * @returns {string}
         */
        renderAbout: function(block) {
            // TODO: Render the item.about property.
            return 'foo';
        },

        /**
         * Renders an HTML block.
         * @param {} block
         * @returns {string}
         */
        renderHtml: function(block) {
            return block.data.src;
        },

        /**
         * Renders a linked image block.
         * @param {} block
         * @returns {string}
         */
        renderLinkedImage: function(block) {
            var html = '';

            // Template
            html += '<a href="{{link_url}}">';
            html += '<img src="{{image_url}}" alt="{{title}}">';
            html += '</a>';

            // Replace placeholders
            html = html.replace('{{link_url}}', block.data.link_url);
            html = html.replace('{{image_url}}', block.data.file.url);
            html = html.replace('{{title}}', block.data.title);

            return html;
        },

        /**
         * Renders a download links block.
         * @param {} block
         * @returns {string}
         */
        renderDownloadLinks: function(block) {
            var html = '';

            if (block.data.download_links.length > 1) {
                // Multiple download links
                html += block.data.title;
                html += '<ul>';
                angular.forEach(block.data.download_links, function(link) {
                    html += '<li><a href="{{url}}">{{title}}</a></li>'
                        .replace('{{url}}', link.url)
                        .replace('{{title}}', link.title);
                });
                html += '</ul>';
            } else {
                // Single link
                html += html += '<a href="{{url}}">{{title}}</a>'
                    .replace('{{url}}', block.data.download_links[0].url)
                    .replace('{{title}}', block.data.download_links[0].title);
            }

            return html;
        },

        /**
         * Renders an item list.
         * @param {} block
         * @returns {string}
         */
        renderItemList: function(block) {
            var html = '<ul class="item-list">';

            angular.forEach(block.data, function(item) {
                var itemHtml = '',
                    url = NavigationService.createUrl(ApiService.getCompositionItemPathName(item.composition_type) + '/' + item.node_id);

                itemHtml += '<li class="item-list-item">';
                itemHtml += '<a ng-href="{{ url }}">'.replace('{{ url }}', url);
                itemHtml += '<img src="{{ thumb }}" class="item-list-thumbnail">'.replace('{{ thumb }}', item.thumb);
                itemHtml += '<div class="item-list-info">';
                itemHtml += '<span class="item-list-title">{{ heading }}</span>'.replace('{{ heading }}', item.heading);
                itemHtml += '<span class="item-list-subheading">{{ subheading }}</span>'.replace('{{ subheading }}', item.subheading);
                itemHtml += '</div>';
                itemHtml += '</a>';
                itemHtml += '</li>';

                html += itemHtml;
            });

            html += '</ul>';

            return html;
        },

        /**
         * Renders an html_chunk block.
         * @param {} block
         * @returns {string}
         */
        renderHtmlChunk: function(block) {
            var html = '';

            if (angular.isDefined(block.data.attributes)) {
                html += block.data.attributes.markup;
            }

            return html;
        },

        /**
         * Renders a download_link block.
         * @param {} block
         * @returns {string}
         */
        renderDownloadLink: function(block) {
            var html = '';

            if (angular.isDefined(block.data.attributes)) {
                html += '<a href="{{ url }}">{{ label }}</a>'
                    .replace('{{ url }}', block.data.attributes.url)
                    .replace('{{ label }}', block.data.attributes.title);
            }

            return html;
        },

        /**
         * Checks if the block type is supported.
         * @param {string} blockType
         * @returns {boolean}
         */
        isBlockTypeSupported: function(blockType) {
            return typeof this.blockToRendererFnMap[blockType] !== 'undefined';
        },

        /**
         * Returns a renderer function by block type.
         * @param {string} blockType
         * @returns {Function}
         */
        getRenderer: function(blockType) {
            if (this.isBlockTypeSupported(blockType)) {
                return service.blockToRendererFnMap[blockType];
            } else {
                throw Error('Block type not supported: ' + blockType);
            }
        },

        /**
         * Renders a block.
         * @param {} block
         * @returns {string} HTML
         */
        render: function(block) {
            return this.getRenderer(block.type)(block);
        }
    };

    service.blockToRendererFnMap = {
        // Default Sir Trevor blocks
        text: service.renderText,
        heading: service.renderHeading,
        image: service.renderImage,
        list: service.renderList,
        quote: service.renderQuote,
        video: service.renderVideo,

        // Custom blocks
        slideshare: service.renderSlideShare,
        about: service.renderAbout,
        html: service.renderHtml,
        linked_image: service.renderLinkedImage,
        download_links: service.renderDownloadLinks,
        item_list: service.renderItemList,

        // CMS item blocks
        html_chunk: service.renderHtmlChunk,
        download_link: service.renderDownloadLink
    };

    return service;
}]);
