angular.module('Gapminder').directive('i18n', ['$rootScope', '$compile', 'uiTranslator', function($rootScope, $compile, uiTranslator) {
    return {
        restrict: 'EA',
        template: false,
        scope: {
            i18nOptions: '='
        },
        link: function($scope, element, attrs) {
            attrs.i18nOptions = $scope.$eval(attrs.i18nOptions); // convert string to object

            var params = getParams(attrs),
                translation = getTranslation(params);

            $rootScope.$on('i18nReady', function() {
                $compile(element)($rootScope); // needed for rendering navbar and footer translations
            });

            renderTranslation(translation, params.target, element);
        }
    };

    /**
     * Returns a translation.
     * @param {} params
     * @returns {string}
     */
    function getTranslation(params) {
        var i18nextString = params.namespace + ':' + params.key,
            options = params.options,
            translation = uiTranslator.translate(i18nextString, options);

        return translation === i18nextString ? null : translation;
    };

    /**
     * Renders a translation.
     * @param {string} translation
     * @param {string} target
     * @param {} element
     */
    function renderTranslation(translation, target, element) {
        // Disable rendering when translation is null
        if (!translation) {
            return;
        }

        if (target === 'html') {
            renderAsHtml(translation, element);
        } else {
            renderAsAttribute(translation, element, target);
        }
    }

    /**
     * Renders a translation as inner HTML.
     * @param {string} translation
     * @param {} element
     */
    function renderAsHtml(translation, element) {
        element.html(translation);
    }

    /**
     * Renders a translation as an HTML attribute.
     * @param {string} translation
     * @param {} element
     * @param {string} attribute
     */
    function renderAsAttribute(translation, element, attribute) {
        element.attr(attribute, translation);
    }

    /**
     * Parses and returns the translation params.
     * @param {string} attrs
     * @returns {}
     */
    function getParams(attrs) {
        var parts = attrs.i18n.split('|'),
            options = attrs.i18nOptions || {},
            params = {};

        // Set options
        if (angular.isDefined(options)) {
            params.options = options;
        }

        // Set namespace and message
        if (angular.isDefined(parts[0])) {
            var messageParts = parts[0].split(':');

            params.namespace = messageParts[0];
            params.key = messageParts[1];
        } else {
            throw Error("i18n directive syntax error: You must provide a translation message as 'namespace:key'.");
        }

        // Set target
        if (angular.isDefined(parts[1])) {
            params.target = parts[1];
        } else {
            throw Error('i18n directive syntax error: You must provide a target (e.g. html or placeholder).');
        }

        return params;
    }
}]);
