angular.module('Gapminder').controller('FooterCtrl', [
    '$scope',
    '$http',
    '$q',
    'ApiService',
    'LocaleService',
function(
    $scope,
    $http,
    $q,
    ApiService,
    LocaleService
) {
    /**
     * Initializes the controller.
     */
    $scope.init = function() {
        var dfd = $q.defer(),
            lang = LocaleService.getCurrentLocale();

        $http.get(ApiService.getApiUrl('/footer/' + lang))
            .then(function(res) {
                $scope.footerItems = res.data;
                dfd.resolve(res);
            }, function(err) {
                dfd.reject(err);
            });

        return dfd.promise;
    };

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
