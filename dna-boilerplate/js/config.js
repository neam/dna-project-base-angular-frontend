/**
 * App uses AngularUI Router to manage routing and views
 * Each view is defined as state.
 */
function config($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('example-view', {
            url: "/example-view",
            templateUrl: "views/example-view.html",
            data: { pageTitle: 'Example view' }
        })

    ;
}
angular
    .module('app')
    .config(config)
    .run(function ($rootScope, $state, env, user) {

        $rootScope.$on('user.login', function () {
            $state.go('example-view');
        });

    });