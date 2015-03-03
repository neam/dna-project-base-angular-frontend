// This is the production environment config. You should only load either development.js OR production.js
angular.module('Gapminder').factory('EnvironmentConfig', function() {
  return {
    environment: 'stage'
  };
});
