// Environment configurations (must be loaded in karma.conf.js files)

angular.module('Gapminder')
  .constant('baseApiUrl', 'http://localhost:1338/api')
  .constant('assetUrl', '')
  .constant('html5Mode', false)
  .constant('testing', true)
  .constant('version', '1.0.0');
