// This is the local config that overrides MainConfig.
// TODO: Copy this file and name it local.js
angular.module('Gapminder').factory('LocalConfig', function() {
    return {
        //baseApiUrl: 'http://localhost:1337/api',
        //baseMockApiUrl: 'http://localhost:1337/mockApi',
        /*apiMocks: {
            // API URIs that are mocked for development purposes.
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        }*/
        //authClientId: 'Gapminder'
    };
});
