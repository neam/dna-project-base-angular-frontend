(function () {

    /**
     * App uses AngularUI Router to manage routing and views
     * Each view is defined as state.
     */
    function config($stateProvider, $urlRouterProvider, $provide) {
        $urlRouterProvider.otherwise("/");
        $stateProvider

            .state('root', {
                abstract: true,
                url: "",
                //templateUrl: "views/common/content_top_navigation.html",
                templateUrl: "views/common/content.html",
                resolve: {
                    // this section ensures that metadata has been queried and is available before rendering any root child-state
                    /*
                    metadataService: 'metadataService',
                    metadata: function (metadataService) {
                        return metadataService.getMetadataPromise();
                    }
                     */
                }
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
                resolve: {
                    // Inject the metadata resolved in the root state
                    metadata: function (metadata) {
                        return metadata;
                    }
                },
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
        .run(function ($rootScope, $state, user, $http, UserApp) {

            $rootScope.$on('user.login', function () {
                //$state.go('report-time');

                // update ua_session_token for rest-api so that api requests are authenticated using the same userapp user
                // (this is a workaround for the fact that cookies are not shared across domains)
                $http.post(env.API_BASE_URL + '/v0/auth/loginNotify', {
                    token: UserApp.tokenStorage.get(),
                    user: user
                })
                    .success(function (data, status, headers, config) {
                        console.log('login rest api sync request successful');
                    })
                    .error(function (data, status, headers, config) {
                        console.log('login rest api sync request not successful');
                    });

            });

            $rootScope.$on('user.logout', function () {

                // destroy session also on rest-api so that api requests are no longer authenticated using the userapp user that was logged out
                // (this is a workaround for the fact that cookies are not shared across domains)
                $http.post(env.API_BASE_URL + '/v0/auth/logoutNotify', {
                    token: UserApp.tokenStorage.get(),
                    user: user
                })
                    .success(function (data, status, headers, config) {
                        console.log('logout rest api sync request successful');
                    })
                    .error(function (data, status, headers, config) {
                        console.log('logout rest api sync request not successful');
                    });

            });

        });

})();