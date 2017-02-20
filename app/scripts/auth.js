'use strict';

let env = require('shared/scripts/env');

require('!!script-loader!bower_components/auth0-lock/build/auth0-lock.min.js');
require('bower_components/angular-cookies/angular-cookies.js');
require('bower_components/a0-angular-storage/dist/angular-storage.js');
require('bower_components/angular-jwt/dist/angular-jwt.js');
require('bower_components/auth0-angular/build/auth0-angular.js');

let setDepth = require('shared/scripts/util.setDepth.js');
let IntercomUserDataHelper = require('project/scripts/class.IntercomUserDataHelper.js');

var module = angular
    .module('auth', [
        // Auth0
        'ngCookies',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ])

    .service('AuthService', function ($http, $q, auth, store, $state, $rootScope) {

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
                $state.go(env.DEFAULT_UI_STATE, {}, {reload: true});
            } else {
                $state.go($rootScope.previousState.name, $rootScope.previousState.params);
            }

        };

        var onLogin = function () {
            auth.profilePromise.then(function (profile) {

                // Ensure there it a user metadata attribute
                if (!profile.user_metadata) {
                    profile.user_metadata = {};
                }

                AuthService.authenticatedDefer.resolve(profile);
                $rootScope.$broadcast('user.login', profile);
            });
        };

        var onAuthenticated = function () {
            auth.profilePromise.then(function (profile) {

                // Ensure there it a user metadata attribute
                if (!profile.user_metadata) {
                    profile.user_metadata = {};
                }

                AuthService.authenticatedDefer.resolve(profile);
                $rootScope.$broadcast('user.authenticated', profile);
            });
        };

        var onSignup = function (event, a, b, c, d) {


        };

        var onLogout = function () {
            $rootScope.$broadcast('user.logout');
        };

        var AuthService = {};

        AuthService.goAfterLogin = goAfterLogin;

        /**
         * This is a defer that is available at app boot time (unlike auth.profilePromise which is only
         * available after we have asked auth0 to authenticate an existing token or similar)
         * so that the app can use it without being worried of if auth.profilePromise is available yet
         */
        AuthService.authenticatedDefer = $q.defer();

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
            Intercom('shutdown');
            goAfterLogin();
        };

        /**
         * Use to update one or several profile attributes at once
         * @param updatedAttributes
         * @param success
         * @param error
         */
        AuthService.updateProfile = function (updatedAttributes, success, error) {

            // Default success/error handlers
            if (!success) {
                success = function (updatedProfile, res) {
                    console.log('updateProfile success', updatedProfile, res)
                };
            }
            if (!error) {
                error = function (error) {
                    console.log('updateProfile error', error)
                };
            }

            let patchAuth0UserProfile = function (profile, updatedAttributes, success, error) {
                let url = 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id;
                $http.patch(url, updatedAttributes).then(success, error);
            };

            // Mock for offline dev
            if (env.OFFLINE_DEV === 'true') {
                patchAuth0UserProfile = function (profile, updatedAttributes, success, error) {
                    let updatedProfile = angular.merge({}, profile, updatedAttributes);
                    success({data: updatedProfile}, {'offline': 'mockup'});
                };
            }

            auth.profilePromise.then(function (profile) {
                patchAuth0UserProfile(profile, updatedAttributes, function (res) {

                    // Update the current profile information used by the app
                    let updatedProfile = res.data;
                    angular.merge(profile, updatedProfile);

                    // Sync metadata with intercom so that it remains somewhat up to date (only the first 10 updates per
                    // page load are accepted by intercom, the rest will be synced upon page refresh)
                    IntercomUserDataHelper.syncAuth0ProfileData(updatedProfile);

                    // Refresh token or similar so that the api gets the updated profile information
                    // TODO

                    // Return the updated profile in the success callback
                    success(updatedProfile, res);

                }, error);

            });
        };

        AuthService.quickUpdateProfileByProp = function (prop, value) {
            let updatedAttributes = {};
            setDepth(updatedAttributes, prop, value);
            console.log('quickUpdateProfileByProp', prop, value, updatedAttributes);
            AuthService.updateProfile(updatedAttributes);
        };

        // Events
        $rootScope.$on('auth0.authenticated', onAuthenticated);
        $rootScope.$on('auth0.signup', onSignup);
        $rootScope.$on('auth0.logout', onLogout);

        return AuthService;

    })

    .controller('LoginController', function ($scope, AuthService) {
        $scope.login = AuthService.login;
        $scope.logout = AuthService.logout;
    })

    /**
     * Config- and run-sections required for auth
     */
    .config(function (authProvider) {

        // Support offline dev
        if (env.OFFLINE_DEV === 'true') {
            env.AUTH0_DOMAIN = '127.0.0.1:3000';
            env.AUTH0_CLIENT_ID = 'auth0mockapiclientid';
            window.auth0mockdata = require('project/scripts/misc/auth0mockdata.js');
        }

        // Configure Auth0
        authProvider.init({
            domain: env.AUTH0_DOMAIN,
            clientID: env.AUTH0_CLIENT_ID,
            // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
            loginState: 'root.start.user.login'
        });

    })

    .config(function (authProvider, $httpProvider, jwtInterceptorProvider) {

        // Configure secure API calls
        jwtInterceptorProvider.tokenGetter = ['store', function (store) {
            // Return the saved token
            return store.get('token');
        }];
        $httpProvider.interceptors.push('jwtInterceptor');

    })

    .config(function ($stateProvider) {

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
                    if (env.FB_CONVERSION_PIXEL_ID !== '') {
                        window.fbq && window.fbq(['track', 'Lead', {'content_name': 'signup'}]);
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
                    Intercom('onHide', _.once(function () {
                        AuthService.goAfterLogin();
                    }));
                    Intercom('show');
                },
                onExit: function (AuthService) {
                    Intercom('hide');
                },
                data: {pageTitle: 'contact'}
            })

    })

    .run(function (auth) {
        // This hooks al auth events to check everything as soon as the app starts
        auth.hookEvents();
    })

    .run(function ($rootScope, auth, store, jwtHelper, $location, $state) {
        // Keep the user logged in after a page refresh
        var keepTheUserLoggedInAfterAPageRefresh = function () {
            var token = store.get('token');
            var profilePromise;
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        profilePromise = auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    // We have a jwt token (meaning that a login was made here before) but the token has expired
                    console.log('no active jwt token', token, $state.current);
                    // Either show the login page or use the refresh token to get a new idToken
                    // TODO: Make sure to return to the attempted-to-access state after login
                    //$state.go('root.start.user.login');
                }
            }
            return profilePromise;
        };
        $rootScope.$on('$locationChangeStart', function () {
            var profilePromise = keepTheUserLoggedInAfterAPageRefresh();
            if (profilePromise) {
                profilePromise.then(function (profile) {
                    // currently unused
                    //$rootScope.$broadcast('user.re-authenticated', profile);
                });
            }
        })
    });

export default module;
