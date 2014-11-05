angular.module('Gapminder').directive('i18n', ['i18nService', function(i18nService) {
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
        var translation = i18nService.t(params.namespace, params.key);

        // Use fallback
        if (translation === params.namespace + ':' + params.key) {
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
        switch (target) {
            default:
                renderAsHtml(translation, element);
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
            throw Error("You must provide a translation message as 'namespace:key'.");
        }

        if (angular.isDefined(parts[2])) {
            params.target = parts[2];
        }

        if (angular.isDefined(parts[1])) {
            params.fallback = parts[1];
        }

        return params;
    }
}]);
