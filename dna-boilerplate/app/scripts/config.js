/**
 * App uses AngularUI Router to manage routing and views
 * Each view is defined as state.
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider

        .state('root', {
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
        })
        .state('root.main', {
            url: "/",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('root.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('topnav', {
            abstract: true,
            url: "/topnav",
            templateUrl: "views/common/content_top_navigation.html",
        })
        .state('topnav.main', {
            url: "/",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('topnav.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('root.example-view', {
            url: "/example-view",
            templateUrl: "views/example-view.html",
            data: { pageTitle: 'Example view' }
        })
        .state('root.pre-launch', {
            url: "/pre-launch",
            templateUrl: "views/pre-launch.html",
            data: { pageTitle: 'Example view' }
        })

    ;
}
angular
    .module('app')
    .config(config)
    .run(function ($rootScope, $state, user) {

        $rootScope.$on('user.login', function () {
            //$state.go('example-view');
        });

    });