angular.module('Gapminder').factory('GoItem', function($resource, ApiService) {
    return $resource(
        ApiService.getApiUrl('/:itemType/:permalink'),
        {
            itemType: '@itemType',
            permalink: '@permalink'
        },
        {
            get: {method: 'GET'}
        }
    );
});
