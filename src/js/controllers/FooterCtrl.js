angular.module('Gapminder').controller('FooterCtrl', [
    '$scope',
    '$http',
    'ApiService',
    'LocaleService',
function(
    $scope,
    $http,
    ApiService,
    LocaleService
) {
    (function() {
        var lang = LocaleService.getCurrentLocale();

        $http.get(ApiService.getApiUrl('/footer/' + lang))
            .then(function(res) {
                $scope.footerItems = res.data;
            });
    })();

    /**
     * Returns a Font-Awesome social icon for the given social network.
     * @param {string} network
     * @returns {string}
     */
    $scope.getSocialLinkIconClass = function(network) {
        var cssClass = 'fa-ellipsis-h';

        switch (network) {
            case 'Twitter':
                cssClass = 'fa-twitter';
                break;

            case 'Facebook':
                cssClass = 'fa-facebook-square';
                break;

            case 'LinkedIn':
                cssClass = 'fa-linkedin';
                break;
        }

        return cssClass;
    };
}]);
