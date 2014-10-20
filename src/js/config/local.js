// This is the local config that overrides MainConfig.
// TODO: Copy this file and name it local.js
angular.module('Gapminder').factory('LocalConfig', function() {
    return {
        //baseApiUrl: 'http://private-6253f-gapminder.apiary-mock.com',
        //baseMockApiUrl: 'http://192.168.1.119:1337/mockApi', // Nord Private 5GHz
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
