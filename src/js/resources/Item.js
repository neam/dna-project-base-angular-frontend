angular.module('Gapminder').factory('Item', ['$resource', 'ApiService', function($resource, ApiService) {
    return $resource(
        ApiService.getApiUrl('/item/:id'),
        {
            id: '@id'
        },
        {
            get: {method: 'GET'}
        }
    );
}]);
