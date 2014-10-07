angular.module('Gapminder').factory('MainConfig', function() {
    return {
        baseUrl: 'http://localhost:1337',
        baseApiUrl: 'http://gapminder.org/api',
        baseMockApiUrl: 'http://localhost:1338/api',
        apiMocks: {
            // API URIs that are mocked for development purposes.
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        },
        authClientId: 'TestClient'
    };
});
