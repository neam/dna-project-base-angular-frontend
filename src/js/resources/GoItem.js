angular.module('Gapminder').factory('GoItem', function($resource, ApiService) {
    return $resource(
        ApiService.getApiUrl('/go/:itemType/:permalink/:lang'),
        {
            itemType: '@itemType',
            permalink: '@permalink',
            lang: '@lang'
        },
        {
            get: {method: 'GET'}
        }
    );
});
