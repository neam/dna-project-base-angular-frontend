angular.module('Gapminder').directive('i18n', ['i18nService', function(i18nService) {
    return {
        restrict: 'EA',
        template: false,
        link: function($scope, element, attrs) {
            var params = getParams(attrs.i18n);

            i18nService.init().then(function(tFunc) {
                var trans = getTranslation(params, tFunc);
                renderTranslation(trans, params.target, element);
            }, function(err) {
                console.log(err);
            });
        }
    };

    /**
     * Returns a translation.
     * @param {} params
     * @returns {string}
     */
    function getTranslation(params, t) {
        var translationString = params.namespace + ':' + params.key,
            translation = t(translationString);

        // Use fallback
        if (translation === translationString) {
            translation = params.fallback;
        }

        return translation;
    };

    /**
     * Renders a translation.
     * @param {string} translation
     * @param {string} target
     * @param {} element
     */
    function renderTranslation(translation, target, element) {
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

        if (angular.isDefined(parts[2])) {
            params.target = parts[2];
        } else {
            throw Error('i18n directive syntax error: You must provide a target (e.g. html or placeholder).');
        }

        if (angular.isDefined(parts[1])) {
            params.fallback = parts[1];
        } else {
            throw Error('i18n directive syntax error: You must provide a fallback value in en_us.');
        }

        return params;
    }
}]);
