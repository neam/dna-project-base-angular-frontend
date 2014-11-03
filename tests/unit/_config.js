// Environment configurations (must be loaded in karma.conf.js files)

angular.module('Gapminder')
    .constant('environment', 'test')
    .constant('baseApiUrl', 'http://localhost:1338/api')
    .constant('html5Mode', false);
