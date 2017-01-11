angular
    .module('app')
    .config(function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true
        });
    })
    .config(function (optimizelyProvider) {
        optimizelyProvider.setKey(env.OPTIMIZELY_PROJECT_ID);
        optimizelyProvider.setActivationEventName(false);
        //optimizelyProvider.setActivationEventName('$stateChangeSuccess');
    })
    .run(function ($rootScope, optimizelyVariation) {
        $rootScope.optimizelyVariation = optimizelyVariation;
    })
    /*
    .config(function (hotkeysProvider) {
        //hotkeysProvider.cheatSheetHotkey = 'k';
    })
    */
    .config(function ($locationProvider) {
        // enable html5Mode for pushstate ('#'-less URLs)
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
    })
    /*
    .config(function (filepickerProvider) {
        filepickerProvider.setKey(env.FILESTACK_API_KEY);
    })
    */
    .run(function ($rootScope) {
        $rootScope.dnaFileSelectionWidgetPreviewHeightPixels = 500;
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.Intercom = window.Intercom;
        });
    })
    .run(function ($rootScope, uiModes) {
        $rootScope.uiModes = uiModes;
    })
    .run(function ($rootScope, routeBasedContentFilters) {
        $rootScope.routeBasedContentFilters = routeBasedContentFilters;
    })
    .run(function ($rootScope, DataEnvironmentService) {

        // Make api endpoint variables globally available in all child views
        $rootScope.dataEnvironments = DataEnvironmentService.dataEnvironments;
        $rootScope.activeDataEnvironment = DataEnvironmentService.activeDataEnvironment;
        $rootScope.setDataEnvironment = DataEnvironmentService.setDataEnvironment;

    })
    .run(function ($rootScope, suggestionsService) {

        // Make suggestions service globally available in all views
        $rootScope.suggestionsService = suggestionsService;

    })
    .run(function ($rootScope, auth) {

        // Make auto0 service available in all views
        $rootScope.auth = auth;

    })
    /*
    .run(function ($rootScope, hotkeys, auth, $http, DataEnvironmentService, $location) {

        // Make hotkey service globally available in all views

        $rootScope.hotkeys = hotkeys;

        // Save $location.search() params between state changes

        var locationSearch;

        locationSearch = $location.search();
        console.log('on load - locationSearch', locationSearch);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //save location.search so we can add it back after transition is done
            locationSearch = $location.search();
            console.log('$stateChangeStart - locationSearch', locationSearch);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //restore all query string parameters back to $location.search
            $location.search(locationSearch);
            console.log('$stateChangeSuccess - locationSearch', locationSearch);
        });

        // Login/logout notifications for rest-api (not really used for other reasons than debugging and possibly stats later on)

        $rootScope.$on('user.login', function () {

            DataEnvironmentService.activeDataEnvironment.promise.then(function () {

                // update ua_session_token for rest-api so that api requests are authenticated using the same userapp user
                // (this is a workaround for the fact that cookies are not shared across api-endpoints)
                $http
                    .post(env.API_BASE_URL + '/' + env.API_VERSION + '/auth/loginNotify', {
                        profile: auth.profile
                    })
                    .success(function (data, status, headers, config) {
                        console.log('login rest api sync request successful');
                    })
                    .error(function (data, status, headers, config) {
                        console.log('login rest api sync request not successful');
                    });

            });

        });

        $rootScope.$on('user.logout', function () {

            DataEnvironmentService.activeDataEnvironment.promise.then(function () {

                // destroy session also on rest-api so that api requests are no longer authenticated using the userapp user that was logged out
                // (this is a workaround for the fact that cookies are not shared across api-endpoints)
                $http
                    .post(env.API_BASE_URL + '/' + env.API_VERSION + '/auth/logoutNotify', {
                        profile: auth.profile
                    })
                    .success(function (data, status, headers, config) {
                        console.log('logout rest api sync request successful');
                    })
                    .error(function (data, status, headers, config) {
                        console.log('logout rest api sync request not successful');
                    });

            });

        });

    })
    */;

})();