angular.module('Gapminder').controller('HomeCtrl', function($scope, urlManager) {
  urlManager.setTranslatedPageTitle('home', 'Home');
});
