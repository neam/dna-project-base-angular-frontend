(function () {

    var module = angular.module('auth', [
        // Auth0
        'ngRoute',
        'ngCookies',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ]);

    /**
     *
     */
    module.service('AuthService', function ($http, $q, auth, store, $state, $rootScope) {

        // Keep track of previous state so that we can send the user back to their previous state on login success of failure
        $rootScope.previousState;
        $rootScope.currentState;
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = {
                name: from.name,
                params: fromParams
            };
            $rootScope.currentState = {
                name: to.name,
                params: to.toParams
            };
        });

        var goAfterLogin = function () {

            // Go to default ui state in case there is no previous state
            if (!$rootScope.previousState || $rootScope.previousState.name === '' || $rootScope.previousState.name === auth.config.loginState || $rootScope.previousState.name.indexOf("user.") > -1) {
                $state.go(env.DEFAULT_UI_STATE, {}, { reload: true });
            } else {
                $state.go($rootScope.previousState.name, $rootScope.previousState.params);
            }

        };

        var onLogin = function () {
            auth.profilePromise.then(function (profile) {
                AuthService.loggedInPromise.resolve();

                // Ensure there it a user metadata attribute
                if (!profile.user_metadata) {
                    profile.user_metadata = {};
                }

                $rootScope.$broadcast('user.login', profile);
            });
        };

        var onSignup = function (event, a, b, c, d) {


        };

        var onLogout = function () {
            //AuthService.loggedInPromise.reject(err);
            $rootScope.$broadcast('user.logout');
        };

        var AuthService = {};

        AuthService.goAfterLogin = goAfterLogin;

        AuthService.loggedInPromise = $q.defer();

        var onSigninSignupSuccess = function (profile, token, accessToken, state, refreshToken) {
            // Success callback
            store.set('profile', profile);
            store.set('token', token);
            onLogin();
            goAfterLogin();
        };

        AuthService.login = function () {
            auth.config.auth0lib.once('hidden', goAfterLogin);
            auth.signin({
                sso: false,
                authParams: {
                    scope: 'openid email app_metadata'
                }
            }, onSigninSignupSuccess, function (err) {
                // Error callback
                console.log('AuthService error callback signin');
                goAfterLogin();
            });
        };
        AuthService.signup = function () {
            auth.config.auth0lib.once('hidden', goAfterLogin);
            auth.signup({
                sso: false,
                authParams: {
                    scope: 'openid email app_metadata'
                }
            }, onSigninSignupSuccess, function (err) {
                // Error callback
                console.log('AuthService error callback signup');
                goAfterLogin();
            });
        };
        AuthService.reset = function () {
            auth.config.auth0lib.once('hidden', goAfterLogin);
            auth.reset({}, function () {
                // Success callback
                $state.go(env.DEFAULT_UI_STATE);
            }, function (err) {
                // Error callback
                console.log('AuthService error callback reset');
                $state.go(env.DEFAULT_UI_STATE);
            });
        };
        AuthService.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            goAfterLogin();
        };
        AuthService.updateProfile = function (profile, updatedAttributes, success, error) {
            var url = 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id;
            $http.patch(url, updatedAttributes).then(success, error);
        };

        // Events
        $rootScope.$on('auth0.authenticated', onLogin);
        $rootScope.$on('auth0.signup', onSignup);
        $rootScope.$on('auth0.logout', onLogout);

        return AuthService;

    });

    /**
     *
     */
    module.controller('LoginController', function ($scope, AuthService) {
        $scope.login = AuthService.login;
        $scope.logout = AuthService.logout;
    });

    /**
     * Config- and run-sections required for auth
     */
    module.config(function (authProvider) {

        // Support offline dev
        if (env.OFFLINE_DEV === 'true') {
            env.AUTH0_DOMAIN = '127.0.0.1:3000';
            env.AUTH0_CLIENT_ID = 'auth0mockapiclientid';
            window.auth0mockdata = {
                profile: {"name":"John Doe","given_name":"John","family_name":"Doe","gender":"male","picture":"http://placehold.it/150x150","age_range":{"min":21},"devices":[{"hardware":"iPhone","os":"iOS"}],"updated_time":"2015-09-07T08:55:46+0000","installed":true,"is_verified":false,"locale":"en_US","name_format":"{first} {last}","verified":true,"nickname":"auth0mockapi","user_metadata":{"api_endpoints":[{"slug":"local"}],"default_api_endpoint_slug":"local","original_mixpanel_distinct_id":"mock-original_mixpanel_distinct_id","signup_tracked":true},"email":"john.doe@example.com","app_metadata":{"r0":{"permissions":{"example":{"superuser":0,"groups":[]}}}},"email_verified":true,"clientID":"foobar","updated_at":"2015-09-09T07:25:39.429Z","user_id":"auth0mockapi|123123123123123123","identities":[{"access_token":"foobar","provider":"auth0mockapi","user_id":"123123123123123123","connection":"auth0mockapi","isSocial":true}],"created_at":"2015-09-03T10:10:43.432Z","global_client_id":"foobar"},
                idToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiZ2VuZGVyIjoibWFsZSIsInBpY3R1cmUiOiJodHRwOi8vcGxhY2Vob2xkLml0LzE1MHgxNTAiLCJhZ2VfcmFuZ2UiOnsibWluIjoyMX0sImRldmljZXMiOlt7ImhhcmR3YXJlIjoiaVBob25lIiwib3MiOiJpT1MifV0sInVwZGF0ZWRfdGltZSI6IjIwMTUtMDktMDdUMDg6NTU6NDYrMDAwMCIsImluc3RhbGxlZCI6dHJ1ZSwiaXNfdmVyaWZpZWQiOmZhbHNlLCJsb2NhbGUiOiJlbl9VUyIsIm5hbWVfZm9ybWF0Ijoie2ZpcnN0fSB7bGFzdH0iLCJ2ZXJpZmllZCI6dHJ1ZSwibmlja25hbWUiOiJhdXRoMG1vY2thcGkiLCJ1c2VyX21ldGFkYXRhIjp7ImFwaV9lbmRwb2ludHMiOlt7InNsdWciOiJsb2NhbCJ9XSwiZGVmYXVsdF9hcGlfZW5kcG9pbnRfc2x1ZyI6ImxvY2FsIiwib3JpZ2luYWxfbWl4cGFuZWxfZGlzdGluY3RfaWQiOiJtb2NrLW9yaWdpbmFsX21peHBhbmVsX2Rpc3RpbmN0X2lkIiwic2lnbnVwX3RyYWNrZWQiOnRydWV9LCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiYXBwX21ldGFkYXRhIjp7InIwIjp7InBlcm1pc3Npb25zIjp7ImV4YW1wbGUiOnsic3VwZXJ1c2VyIjowLCJncm91cHMiOltdfX19fSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNsaWVudElEIjoiZm9vYmFyIiwidXBkYXRlZF9hdCI6IjIwMTUtMDktMDlUMDc6MjU6MzkuNDI5WiIsInVzZXJfaWQiOiJhdXRoMG1vY2thcGl8MTIzMTIzMTIzMTIzMTIzMTIzIiwiaWRlbnRpdGllcyI6W3siYWNjZXNzX3Rva2VuIjoiZm9vYmFyIiwicHJvdmlkZXIiOiJhdXRoMG1vY2thcGkiLCJ1c2VyX2lkIjoiMTIzMTIzMTIzMTIzMTIzMTIzIiwiY29ubmVjdGlvbiI6ImF1dGgwbW9ja2FwaSIsImlzU29jaWFsIjp0cnVlfV0sImNyZWF0ZWRfYXQiOiIyMDE1LTA5LTAzVDEwOjEwOjQzLjQzMloiLCJnbG9iYWxfY2xpZW50X2lkIjoiZm9vYmFyIn0._HkQuZs6Y6N38biAnksnWg3Ayf3qnE2hwBkeMKfxbiE'
            };
        }

        // Configure Auth0
        authProvider.init({
            domain: env.AUTH0_DOMAIN,
            clientID: env.AUTH0_CLIENT_ID,
            // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
            loginState: 'root.start.user.login'
        });

    });

    module.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {

        // Configure secure API calls
        jwtInterceptorProvider.tokenGetter = ['store', function (store) {
            // Return the saved token
            return store.get('token');
        }];
        $httpProvider.interceptors.push('jwtInterceptor');

    });

    module.config(function ($stateProvider) {

        $stateProvider

            // Routes for auth
            .state('root.start.user', {
                abstract: true,
                url: "/user",
            })
            .state('root.start.user.login', {
                url: "/login",
                onEnter: function (auth, AuthService) {
                    console.log('user.login state');
                    if (!auth.isAuthenticated) {
                        AuthService.login();
                    } else {
                        AuthService.goAfterLogin();
                    }
                },
                //templateUrl: "views/userapp/login.html",
                data: {pageTitle: 'Login'}
            })
            .state('root.start.user.signup', {
                url: "/signup",
                onEnter: function (auth, AuthService) {
                    console.log('user.signup state');
                    if (auth.isAuthenticated) {
                        AuthService.logout();
                    }
                    AuthService.signup();
                },
                data: {plan: 'default', pageTitle: 'Signup'}
            })
            .state('root.start.user.logout', {
                url: "/logout",
                onEnter: function (AuthService) {
                    console.log('user.logout state');
                    AuthService.logout();
                },
                data: {pageTitle: 'Logout'}
            })
            .state('root.start.user.reset-password', {
                url: "/reset-password",
                onEnter: function (AuthService) {
                    console.log('user.reset-password state');
                    AuthService.reset();
                },
                data: {pageTitle: 'reset-password'}
            })
            .state('root.start.user.contact', {
                url: "/contact",
                onEnter: function (AuthService) {
                    Intercom('onHide', _.once(function() {
                        AuthService.goAfterLogin();
                    }));
                    Intercom('show');
                },
                onExit: function (AuthService) {
                    Intercom('hide');
                },
                data: {pageTitle: 'contact'}
            })

    });

    module.run(function (auth) {
        // This hooks al auth events to check everything as soon as the app starts
        auth.hookEvents();
    });

    module.run(function ($rootScope, auth, store, jwtHelper, $location) {
        // Keep the user logged in after a page refresh
        $rootScope.$on('$locationChangeStart', function () {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    // Either show the login page or use the refresh token to get a new idToken
                    $location.path('/');
                }
            }
        })
    });

})();