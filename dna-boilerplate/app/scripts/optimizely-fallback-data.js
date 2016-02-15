(function () {
    var app = angular.module('app');

    /**
     * Service used to deliver data in case optimizely does not manage to deliver the variation data in time
     */
    app.service('optimizelyFallbackData', function () {

        var fallbackData = {"foo": "bar"};
        return fallbackData;

    });

})();
