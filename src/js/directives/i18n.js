angular.module('Gapminder').directive('i18n', ['$window', 'i18nService', function($window, i18nService) {
    return {
        restrict: 'EA',
        template: false,
        link: function($scope, element, attrs) {
            var params = getParams(attrs.i18n),
                translation = getTranslation(params);

            renderTranslation(translation, params.target, element);
        }
    };

    /**
     * Returns a translation.
     * @param {} params
     * @returns {string}
     */
    function getTranslation(params) {
        var translationString = params.namespace + ':' + params.key,
            translation = $window.i18n.t(translationString);

        return translation === translationString ? null : translation;
    };

    // TODO: Move translation functions to i18nService.

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
     * @param {string} data
     * @returns {}
     */
    function getParams(data) {
        var parts = data.split('|'),
            params = {};

        if (angular.isDefined(parts[0])) {
            var messageParts = parts[0].split(':');

            params.namespace = messageParts[0];
            params.key = messageParts[1];
        } else {
            throw Error("i18n directive syntax error: You must provide a translation message as 'namespace:key'.");
        }

        if (angular.isDefined(parts[1])) {
            params.target = parts[1];
        } else {
            throw Error('i18n directive syntax error: You must provide a target (e.g. html or placeholder).');
        }

        return params;
    }
}]);
