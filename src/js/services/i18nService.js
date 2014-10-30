angular.module('Gapminder').factory('i18nService', function($q, $rootScope) {
    var translatables = [],
        translations = [];

    function fetchTranslations() {
        var dfd = $q.defer();

        setTimeout(function() {
            translations.push({
                text: 'foo',
                context: 'bar',
                count: 1,
                translation: 'FOOOO'
            });

            dfd.resolve();
        }, 1000);

        return dfd.promise;
    }

    function getTranslation(translatable) {
        var result = '';

        translations.forEach(function(translation) {
            if (translation.text === translatable.text && translation.context === translatable.context && translation.count === parseInt(translatable.count)) {
                result = translation;
            }
        });

        return result.translation;
    }

    return {
        /**
         * Returns all translatables.
         * @returns {Array}
         */
        getTranslatables: function() {
            return translatables;
        },
        /**
         * Adds a translation.
         * @param {string} text
         * @param {string} context
         * @param {number} count
         * @returns {Deferred.promise}
         */
        addTranslatable: function(text, context, count) {
            var dfd = $q.defer();

            if (angular.isUndefined(text)) {
                dfd.reject();
                throw Error('Translation text must be specified.');
            }

            var isDuplicate = false,
                context = context || null,
                count = count || null,
                translatable = {
                    text: text,
                    context: context,
                    count: count
                };

            // Check for duplicates
            translatables.forEach(function(tr) {
                if (tr.text === translatable.text && tr.context === translatable.context && tr.count === translatable.count) {
                    isDuplicate = true;
                }
            });

            if (isDuplicate) {
                dfd.reject();
            } else {
                translatables.push(translatable);
                fetchTranslations()
                    .then(function() {
                        dfd.resolve(getTranslation(translatable));
                    });
            }

            return dfd.promise;
        }
    };
});
