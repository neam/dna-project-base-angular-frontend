angular.module('Gapminder').factory('MainConfig', function() {
    return {
        baseUrl: 'http://localhost:1337',
        baseApiUrl: 'http://localhost:1337/api',
        baseMockApiUrl: 'http://localhost:1337/mockApi',
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
