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
                $state.go(env.DEFAULT_UI_STATE);
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

        AuthService.login = function () {
            auth.signin({
                sso: false,
                authParams: {
                    scope: 'openid email app_metadata'
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                onLogin();
                goAfterLogin();
            }, function (err) {
                // Error callback
                console.log('AuthService error callback signin');
                goAfterLogin();
            });
        };
        AuthService.signup = function () {
            auth.signup({
                sso: false,
                authParams: {
                    scope: 'openid email app_metadata'
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                onLogin();
                goAfterLogin();
            }, function (err) {
                // Error callback
                console.log('AuthService error callback signup');
                goAfterLogin();
            });
        };
        AuthService.reset = function () {
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
            $state.go(env.DEFAULT_UI_STATE);
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

        // Configure Auth0
        authProvider.init({
            domain: env.AUTH0_DOMAIN,
            clientID: env.AUTH0_CLIENT_ID,
            // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
            loginState: 'root.start.user.login'
        });

        // TODO for Auth0
        if (env.USE_USERAPP_MOCK_API === 'true') {
            TODO.setBaseAddress('127.0.0.1:3000');
            TODO.setSecure(false);
            TODO.setDebug(true);
        }

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