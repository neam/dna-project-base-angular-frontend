'use strict';

// Auth0Lock
//require('imports-loader?window.Auth0Lock=auth0-lock,window.auth0=auth0-js!angular-lock'); // <-- does not work, but the code below works
import Auth0Lock from 'auth0-lock';
window.Auth0Lock = Auth0Lock;
import Auth0 from 'auth0-js';
window.auth0 = Auth0; // angular-lock expects a global 'auth0' variable all lower-case
require('angular-lock');

let env = require('shared/scripts/env');

require('angular-cookies');
require('angular-storage');
require('angular-jwt');

let setDepth = require('shared/scripts/util.setDepth.js');
let IntercomUserDataHelper = require('project/scripts/class.IntercomUserDataHelper.js');

// Here include the URL to redirect to if the user tries to access a resource when not authenticated.
const loginState = 'root.start.user.login';

let module = angular
    .module('auth', [
        // Auth0
        'ngCookies',
        'auth0.lock',
        'angular-storage',
        'angular-jwt'
    ])

    // Compat-service for code that used Auth0 lock v8 etc to work - TODO: Refactor until this is unnecessary
    .service('auth', function ($rootScope, authService, lock, authManager) {

        let auth = {
            hookEvents: function () {

                // Put the authService and auth on $rootScope so that many views can check auth status through it
                $rootScope.authService = authService;
                $rootScope.auth = this;

                // Register the event listeners that react on lock events
                authService.registerEventListeners();

                // Register the synchronous hash parser when using UI Router
                lock.interceptHash();

                // Stay logged in after page refresh
                authManager.checkAuthOnRefresh();

                // Listen to 'unauthenticated' and redirect according to jwtOptions config (below in this file) when that event occurs
                authManager.redirectWhenUnauthenticated();

                // TODO: Show login page with flash message "session timeout" upon $rootScope.$broadcast('tokenHasExpired', token);

            },

            profilePromise: authService.authenticatedDefer.promise,

            profile: {},

        };

        auth.profilePromise.then(function (profile) {
            auth.profile = profile;
        });

        return auth;

    })

    .service('authService', function (lock, authManager, $q, store, $state, $rootScope) {

        // Keep track of previous state so that we can send the user back to their previous state on login success of failure
        $rootScope.previousState = null;
        $rootScope.currentState = null;
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

        let goAfterLogin = function () {

            // Go to default ui state in case there is no previous state
            if (!$rootScope.previousState || $rootScope.previousState.name === '' || $rootScope.previousState.name === loginState || $rootScope.previousState.name.indexOf("user.") > -1) {
                $state.go(env.DEFAULT_UI_STATE, {}, {reload: true});
            } else {
                $state.go($rootScope.previousState.name, $rootScope.previousState.params);
            }

        };

        let authService = {};

        /**
         * This is a defer that is available at app boot time (unlike auth.profilePromise which is only
         * available after we have asked auth0 to authenticate an existing id token or similar)
         * so that the app can use it without being worried of if auth.profilePromise is available yet
         */
        authService.authenticatedDefer = $q.defer();

        // Our own definition of authenticated includes that we also have the user's profile information
        authService.isAuthenticatedWithProfileData = false;

        authService.onAuthenticated = function (profile) {
            // Ensure there is a user metadata attribute
            if (!profile.user_metadata) {
                profile.user_metadata = {};
            }
            authService.authenticatedDefer.resolve(profile);
            authService.isAuthenticatedWithProfileData = true;
            $rootScope.$broadcast('authenticated', profile);
        };

        authService.onLogout = function () {
            authService.authenticatedDefer = $q.defer();
            authService.isAuthenticatedWithProfileData = false;
            $rootScope.$broadcast('unauthenticated');
        };

        authService.goAfterLogin = goAfterLogin;

        let onAuthenticationAndSigninAndSignupSuccess = function (profile, idToken, accessToken /*, state, refreshToken*/) {
            // Success callback
            store.set('profile', profile);
            store.set('id_token', idToken);
            store.set('access_token', accessToken);
            authService.onAuthenticated(profile);
        };

        authService.login = function () {
            lock.show({
                initialScreen: 'login'
            });
        };
        authService.signup = function () {
            lock.show({
                initialScreen: 'signUp'
            });
        };
        authService.resetPassword = function () {
            lock.show({
                initialScreen: 'forgotPassword'
            });
        };
        authService.logout = function () {
            // Logging out just requires removing the user's
            // id token and profile
            store.remove('id_token');
            store.remove('access_token');
            store.remove('profile');
            authManager.unauthenticate();
            Intercom('shutdown');
            authService.onLogout();
        };

        authService.authenticatedCallback = function (authResult) {

            authManager.authenticate();

            lock.getUserInfo(authResult.accessToken, function (error, profile) {
                if (!error) {
                    onAuthenticationAndSigninAndSignupSuccess(profile, authResult.idToken, authResult.accessToken /*, authResult.state, authResult.refreshToken*/);
                } else {
                    console.error('lock.getUserInfo error', error);
                }
            });

        };

        // Events
        authService.registerEventListeners = function () {

            lock.on('hide', goAfterLogin);

            // Set up the logic for when a user authenticates
            lock.on('authenticated', function (authResult) {
                console.log('lock authenticated', authResult);
                authService.authenticatedCallback(authResult);
                goAfterLogin();
            });

            lock.on('authorization_error', function (err) {
                // Error callback
                console.log('authService error callback signin', err);
                goAfterLogin();
            });

        };

        return authService;

    })

    .service('authProfileUpdateService', function ($http, auth) {

        let authProfileUpdateService = {};

        /**
         * Use to update one or several profile attributes at once
         * @param updatedAttributes
         * @param success
         * @param error
         */
        authProfileUpdateService.updateProfile = function (updatedAttributes, success, error) {

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

                    // Refresh id token or similar so that the api gets the updated profile information
                    // TODO

                    // Return the updated profile in the success callback
                    success(updatedProfile, res);

                }, error);

            });
        };

        authProfileUpdateService.quickUpdateProfileByProp = function (prop, value) {
            let updatedAttributes = {};
            setDepth(updatedAttributes, prop, value);
            console.log('quickUpdateProfileByProp', prop, value, updatedAttributes);
            authProfileUpdateService.updateProfile(updatedAttributes);
        };

        return authProfileUpdateService;

    })

    .controller('LoginController', function ($scope, authService) {
        $scope.login = authService.login;
        $scope.logout = authService.logout;
    })

    /**
     * Config- and run-sections required for auth
     */
    .config(function (lockProvider) {

        // Support offline dev
        if (env.OFFLINE_DEV === 'true') {
            env.AUTH0_DOMAIN = '127.0.0.1:3000';
            env.AUTH0_CLIENT_ID = 'auth0mockapiclientid';
            window.auth0mockdata = require('project/scripts/misc/auth0mockdata.js');
        }

        // Configure Auth0
        let options = {};

        // Use popup mode by default
        options.auth = {};
        options.auth.redirect = false;

        // Auto-close popup on successful login
        options.autoclose = true;

        // Use our branding
        options.theme = {};
        options.theme.logo = env.AUTH0_LOCK_BRAND_LOGO_URL;
        options.theme.languageDictionary = {
            title: "Clerk.AI"
        };

        // Detect special cases that will not work with popup mode and selectively enable redirect mode
        // TODO change auth0 jwt algorithm overall so that parseHash can pick up the id token information when the redirect is ready
        // TODO specifically enforce redirect for IE and Chrome+Firefox on iOS as described inhttps://auth0.com/forum/t/popup-login-window-is-not-closed-after-authentication/2843
        // TODO persist any necessary application state in local storage or a cookie before the user logs in or signs up + ad custom post-authentication logic in the listener for the authenticated event to allow the user to pick up from where they left off
        if (false) {
            options.auth.redirect = true;
        }

        // https://auth0.com/docs/libraries/lock/v10/popup-mode#database-connections-and-popup-mode
        options.auth.oss = false;

        // Include more than the default in the jwt token upon authentication, so that backend operations can verify granular permissions etc
        options.auth.params = {};
        //options.auth.params.scope = 'openid email app_metadata';
        options.auth.params.scope = 'openid email user_metadata app_metadata picture';

        // Initialize Auth0
        lockProvider.init({
            clientID: env.AUTH0_CLIENT_ID,
            domain: env.AUTH0_DOMAIN,
            options: options,
        });

    })

    .config(function ($httpProvider, jwtOptionsProvider) {

        jwtOptionsProvider.config({

            // Configure secure API calls
            tokenGetter: ['store', function (store) {
                // Return the saved id token
                return store.get('id_token');
            }],
            whiteListedDomains: [
                new RegExp('.+\.' + env.AUTH0_JWT_WHITELISTED_DOMAIN + '$', 'i'),
                new RegExp('.+\.auth0\.com$', 'i'),
                'localhost',
                '127.0.0.1'
            ],

            // Configure redirect to login route when trying to request a route that requires login
            unauthenticatedRedirector: ['$state', function ($state) {
                $state.go(loginState, {}, {reload: true});
            }],

        });

        /*
         TODO: Implement token refresh as per https://github.com/auth0/angular-jwt/issues/57 (below)
         let refreshPromise;
         jwtInterceptorProvider.tokenGetter = ['jwtHelper', '$http', function(jwtHelper, $http) {
         if (refreshPromise) {
         return refreshPromise;
         }
         let idToken = localStorage.getItem('id_token');
         if (jwtHelper.isTokenExpired(idToken)) {
         let refreshToken = localStorage.getItem('refresh_token');
         // This is a promise of a JWT id_token
         refreshPromise = $http({
         url: '/delegation',
         // This makes it so that this request doesn't send the JWT
         skipAuthorization: true,
         method: 'POST',
         data: {
         grant_type: 'refresh_token',
         refresh_token: refreshToken
         }
         }).then(function(response) {
         let id_token = response.data.id_token;
         localStorage.setItem('id_token', id_token);
         refreshPromise = null
         return id_token;
         });
         return refreshPromise
         } else {
         return idToken;
         }
         }];
         */

        $httpProvider.interceptors.push('jwtInterceptor');

    })

    .config(function ($stateProvider) {

        $stateProvider

        // Routes for auth
            .state('root.start.user', {
                abstract: true,
                url: "user",
            })
            .state('root.start.user.login', {
                url: "/login",
                onEnter: function (auth, authService) {
                    console.log('user.login state');
                    if (!auth.isAuthenticatedWithProfileData) {
                        authService.login();
                    } else {
                        authService.goAfterLogin();
                    }
                },
                //templateUrl: "views/userapp/login.html",
                data: {pageTitle: 'Login'}
            })
            .state('root.start.user.signup', {
                url: "/signup",
                onEnter: function (auth, authService) {
                    console.log('user.signup state');
                    if (auth.isAuthenticatedWithProfileData) {
                        authService.logout();
                    }
                    if (env.FB_CONVERSION_PIXEL_ID !== '') {
                        window.fbq && window.fbq(['track', 'Lead', {'content_name': 'signup'}]);
                    }
                    authService.signup();
                },
                data: {plan: 'default', pageTitle: 'Signup'}
            })
            .state('root.start.user.logout', {
                url: "/logout",
                onEnter: function (authService, $state, $timeout) {
                    console.log('user.logout state');
                    authService.logout();
                    $timeout(function () {
                        $state.go(env.DEFAULT_UI_STATE);
                    });
                    //return $state.target(env.DEFAULT_UI_STATE, {});
                },
                data: {pageTitle: 'Logout'}
            })
            .state('root.start.user.reset-password', {
                url: "/reset-password",
                onEnter: function (authService) {
                    console.log('user.reset-password state');
                    authService.resetPassword();
                },
                data: {pageTitle: 'reset-password'}
            })
            .state('root.start.user.contact', {
                url: "/contact",
                onEnter: function (authService) {
                    Intercom('onHide', _.once(function () {
                        authService.goAfterLogin();
                    }));
                    Intercom('show');
                },
                onExit: function (authService) {
                    Intercom('hide');
                },
                data: {pageTitle: 'contact'}
            })

    })

    .run(function (auth) {
        // This hooks all auth events to check everything as soon as the app starts
        auth.hookEvents();
    })

    // This method is in addition to authManager's check which only sets $rootScope.isAuthenticated
    .run(function ($rootScope, authManager, authService, store, jwtHelper, $location, $state) {

        // Keep the user logged in after a page refresh
        $rootScope.$on('$locationChangeStart', function () {
            const idToken = authManager.getToken();
            const accessToken = store.get('access_token');
            // Silly method name "isAuthenticated" should actually be called idTokenIsNotExpired() or similar
            // since it does not return the value of isAuthenticated
            if (authManager.isAuthenticated() && !authService.isAuthenticatedWithProfileData) {
                console.log('token re-authenticated', authResult);
                //let profile = store.get('profile');
                let authResult = {
                    idToken: idToken,
                    accessToken: accessToken,
                };
                authService.authenticatedCallback(authResult);
            } else {
                if (idToken) {
                    // We have a jwt id token (meaning that a login was made here before) but the id token has expired
                    console.log('no active jwt idToken', idToken, $state.current);
                    // Either show the login page or use the refresh id token to get a new idToken
                    // TODO: Make sure to return to the attempted-to-access state after login
                    //$state.go(loginState);
                } else {
                    // No token - do nothing
                }

                // Not authenticated - do nothing here

            }
        });

    });

export default module;
