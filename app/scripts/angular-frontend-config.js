'use strict';

/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    //$urlRouterProvider.otherwise("");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

    /*
     .state('index', {
     abstract: true,
     url: "/index",
     templateUrl: "views/common/content.html",
     })
     .state('index.main', {
     url: "/main",
     templateUrl: "views/main.html",
     data: { public: true, pageTitle: 'Example view' }
     })
     .state('index.minor', {
     url: "/minor",
     templateUrl: "views/minor.html",
     data: { pageTitle: 'Example view' }
     })
     */

    /*
     .state('dashboards', {
     abstract: true,
     url: "/dashboards",
     templateUrl: "views/common/content.html",
     })
     .state('dashboards.dashboard_1', {
     url: "/dashboard_1",
     templateUrl: "views/dashboard_1.html",
     })
     .state('dashboards.dashboard_2', {
     url: "/dashboard_2",
     templateUrl: "views/dashboard_2.html",
     data: { pageTitle: 'Dashboard 2' }
     })
     .state('dashboards.dashboard_3', {
     url: "/dashboard_3",
     templateUrl: "views/dashboard_3.html",
     data: { pageTitle: 'Dashboard 3' }
     })
     .state('charts', {
     abstract: true,
     url: "/charts",
     templateUrl: "views/common/content.html",
     })
     .state('charts.flot_chart', {
     url: "/flot_chart",
     templateUrl: "views/graph_flot.html",
     data: { pageTitle: 'Flot chart' }
     })
     .state('charts.morris_chart', {
     url: "/morris_chart",
     templateUrl: "views/graph_morris.html",
     data: { pageTitle: 'Morris chart' }
     })
     .state('charts.rickshaw_chart', {
     url: "/rickshaw_chart",
     templateUrl: "views/graph_rickshaw.html",
     data: { pageTitle: 'Rickshaw chart' }
     })
     .state('charts.peity_chart', {
     url: "/peity_chart",
     templateUrl: "views/graph_peity.html",
     data: { pageTitle: 'Peity graphs' }
     })
     .state('charts.sparkline_chart', {
     url: "/sparkline_chart",
     templateUrl: "views/graph_sparkline.html",
     data: { pageTitle: 'Sparkline chart' }
     })
     .state('charts.chartjs_chart', {
     url: "/chartjs_chart",
     templateUrl: "views/chartjs.html",
     data: { pageTitle: 'Chart.js' }
     })
     .state('mailbox', {
     abstract: true,
     url: "/mailbox",
     templateUrl: "views/common/content.html",
     })
     .state('mailbox.inbox', {
     url: "/inbox",
     templateUrl: "views/mailbox.html",
     data: { pageTitle: 'Mail Inbox' }
     })
     .state('mailbox.email_view', {
     url: "/email_view",
     templateUrl: "views/mail_detail.html",
     data: { pageTitle: 'Mail detail' }
     })
     .state('mailbox.email_compose', {
     url: "/email_compose",
     templateUrl: "views/mail_compose.html",
     data: { pageTitle: 'Mail compose' }
     })
     .state('mailbox.email_template', {
     url: "/email_template",
     templateUrl: "views/email_template.html",
     data: { pageTitle: 'Mail compose' }
     })
     .state('widgets', {
     url: "/widgets",
     templateUrl: "views/widgets.html",
     data: { pageTitle: 'Widhets' }
     })
     .state('forms', {
     abstract: true,
     url: "/forms",
     templateUrl: "views/common/content.html",
     })
     .state('forms.basic_form', {
     url: "/basic_form",
     templateUrl: "views/form_basic.html",
     data: { pageTitle: 'Basic form' }
     })
     .state('forms.advanced_plugins', {
     url: "/advanced_plugins",
     templateUrl: "views/form_advanced.html",
     data: { pageTitle: 'Advanced form' }
     })
     .state('forms.wizard', {
     url: "/wizard",
     templateUrl: "views/form_wizard.html",
     controller: wizardCtrl,
     data: { pageTitle: 'Wizard form' }
     })
     .state('forms.wizard.step_one', {
     url: '/step_one',
     templateUrl: 'views/wizard/step_one.html',
     data: { pageTitle: 'Wizard form' }
     })
     .state('forms.wizard.step_two', {
     url: '/step_two',
     templateUrl: 'views/wizard/step_two.html',
     data: { pageTitle: 'Wizard form' }
     })
     .state('forms.wizard.step_three', {
     url: '/step_three',
     templateUrl: 'views/wizard/step_three.html',
     data: { pageTitle: 'Wizard form' }
     })
     .state('forms.file_upload', {
     url: "/file_upload",
     templateUrl: "views/form_file_upload.html",
     data: { pageTitle: 'File upload' }
     })
     .state('forms.text_editor', {
     url: "/text_editor",
     templateUrl: "views/form_editors.html",
     data: { pageTitle: 'Text editor' }
     })
     .state('app', {
     abstract: true,
     url: "/app",
     templateUrl: "views/common/content.html",
     })
     .state('app.contacts', {
     url: "/contacts",
     templateUrl: "views/contacts.html",
     data: { pageTitle: 'Contacts' }
     })
     .state('app.profile', {
     url: "/profile",
     templateUrl: "views/profile.html",
     data: { pageTitle: 'Profile' }
     })
     .state('app.projects', {
     url: "/projects",
     templateUrl: "views/projects.html",
     data: { pageTitle: 'Projects' }
     })
     .state('app.project_detail', {
     url: "/project_detail",
     templateUrl: "views/project_detail.html",
     data: { pageTitle: 'Project detail' }
     })
     .state('app.file_manager', {
     url: "/file_manager",
     templateUrl: "views/file_manager.html",
     data: { pageTitle: 'File manager' }
     })
     .state('app.calendar', {
     url: "/calendar",
     templateUrl: "views/calendar.html",
     data: { pageTitle: 'Calendar' }
     })
     .state('app.faq', {
     url: "/faq",
     templateUrl: "views/faq.html",
     data: { pageTitle: 'FAQ' }
     })
     .state('app.timeline', {
     url: "/timeline",
     templateUrl: "views/timeline.html",
     data: { pageTitle: 'Timeline' }
     })
     .state('app.pin_board', {
     url: "/pin_board",
     templateUrl: "views/pin_board.html",
     data: { pageTitle: 'Pin board' }
     })
     .state('app.invoice', {
     url: "/invoice",
     templateUrl: "views/invoice.html",
     data: { pageTitle: 'Invoice' }
     })
     .state('pages', {
     abstract: true,
     url: "/pages",
     templateUrl: "views/common/content.html",
     })
     .state('pages.search_results', {
     url: "/search_results",
     templateUrl: "views/search_results.html",
     data: { pageTitle: 'Search results' }
     })
     .state('pages.empy_page', {
     url: "/empy_page",
     templateUrl: "views/empty_page.html",
     data: { pageTitle: 'Empty page' }
     })
     .state('ui', {
     abstract: true,
     url: "/ui",
     templateUrl: "views/common/content.html",
     })
     .state('ui.typography', {
     url: "/typography",
     templateUrl: "views/typography.html",
     data: { pageTitle: 'Typography' }
     })
     .state('ui.icons', {
     url: "/icons",
     templateUrl: "views/icons.html",
     data: { pageTitle: 'Icons' }
     })
     .state('ui.draggable_panels', {
     url: "/draggable_panels",
     templateUrl: "views/draggable_panels.html",
     data: { pageTitle: 'Draggable panels' }
     })
     .state('ui.buttons', {
     url: "/buttons",
     templateUrl: "views/buttons.html",
     data: { pageTitle: 'Buttons' }
     })
     .state('ui.tabs_panels', {
     url: "/tabs_panels",
     templateUrl: "views/tabs_panels.html",
     data: { pageTitle: 'Tabs and panels' }
     })
     .state('ui.notifications_tooltips', {
     url: "/notifications_tooltips",
     templateUrl: "views/notifications.html",
     data: { pageTitle: 'Notifications and tooltips' }
     })
     .state('ui.badges_labels', {
     url: "/badges_labels",
     templateUrl: "views/badges_labels.html",
     data: { pageTitle: 'Badges and labels and progress' }
     })
     .state('ui.video', {
     url: "/video",
     templateUrl: "views/video.html",
     data: { pageTitle: 'Responsible Video' }
     })
     .state('grid_options', {
     url: "/grid_options",
     templateUrl: "views/grid_options.html",
     data: { pageTitle: 'Grid options' }
     })
     .state('miscellaneous', {
     abstract: true,
     url: "/miscellaneous",
     templateUrl: "views/common/content.html",
     })
     .state('miscellaneous.google_maps', {
     url: "/google_maps",
     templateUrl: "views/google_maps.html",
     data: { pageTitle: 'Google maps' }
     })
     .state('miscellaneous.code_editor', {
     url: "/code_editor",
     templateUrl: "views/code_editor.html",
     data: { pageTitle: 'Code Editor' }
     })
     .state('miscellaneous.modal_window', {
     url: "/modal_window",
     templateUrl: "views/modal_window.html",
     data: { pageTitle: 'Modal window' }
     })
     .state('miscellaneous.nestable_list', {
     url: "/nestable_list",
     templateUrl: "views/nestable_list.html",
     data: { pageTitle: 'Nestable List' }
     })
     .state('miscellaneous.notify', {
     url: "/notify",
     templateUrl: "views/notify.html",
     data: { pageTitle: 'Notifications for angularJS' }
     })
     .state('miscellaneous.timeline_2', {
     url: "/timeline_2",
     templateUrl: "views/timeline_2.html",
     data: { pageTitle: 'Timeline version 2' }
     })
     .state('miscellaneous.forum_view', {
     url: "/forum_view",
     templateUrl: "views/forum_view.html",
     data: { pageTitle: 'Forum - general view' }
     })
     .state('miscellaneous.forum_post_view', {
     url: "/forum_post_view",
     templateUrl: "views/forum_post_view.html",
     data: { pageTitle: 'Forum - post view' }
     })
     .state('tables', {
     abstract: true,
     url: "/tables",
     templateUrl: "views/common/content.html",
     })
     .state('tables.static_table', {
     url: "/static_table",
     templateUrl: "views/table_basic.html",
     data: { pageTitle: 'Static table' }
     })
     .state('tables.data_tables', {
     url: "/data_tables",
     templateUrl: "views/table_data_tables.html",
     data: { pageTitle: 'Data Tables' }
     })
     .state('tables.nggrid', {
     url: "/nggrid",
     templateUrl: "views/nggrid.html",
     data: { pageTitle: 'ng Grid' }
     })
     .state('gallery', {
     abstract: true,
     url: "/gallery",
     templateUrl: "views/common/content.html",
     })
     .state('gallery.basic_gallery', {
     url: "/basic_gallery",
     templateUrl: "views/basic_gallery.html",
     data: { pageTitle: 'Basic gallery' }
     })
     .state('gallery.bootstrap_carousel', {
     url: "/bootstrap_carousel",
     templateUrl: "views/carousel.html",
     data: { pageTitle: 'Bootstrap carousel' }
     })
     .state('css_animations', {
     url: "/css_animations",
     templateUrl: "views/css_animation.html",
     data: { pageTitle: 'CSS Animations' }
     })
     */

    // DC
        .state('dc_nasdaq', {
            url: "/dc_nasdaq",
            templateUrl: "views/dc/dc_nasdaq.html",
            data: {pageTitle: 'DC Nasdaq Example'}
        })

    ;
}

let module = angular.module('angular-frontend-config', [])

    .config(config)

    .run(function ($rootScope, $state, $location) {
        $rootScope.$state = $state;
        $rootScope.$location = $location;
        $rootScope.env = env;
    })

    .run(function ($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.stateIsLoading = true;
        });
        $rootScope.$on('$stateChangeSuccess', function () {
            $rootScope.stateIsLoading = false;
        });
        $rootScope.$on('$stateChangeError', function () {
            $rootScope.stateIsLoading = false;
        });

    })

    .run(function ($rootScope, $state, $location, AuthService, $window) {
        var updateTrackersAtSignup = function (profile) {

            //console.log('user.signup');

            // Mixpanel
            $window.mixpanel.track(
                "user.signup", {
                    "signup_plan": profile.user_metadata.signup_plan,
                    "signup_conversion_value": profile.user_metadata.signup_conversion_value
                }
            );

            // Facebook conversion tracking
            var fb_conversion_data = {
                'value': (profile.user_metadata.signup_conversion_value || '0'),
                'currency': 'USD',
                'content_name': 'signup'
            };
            //console.log('fb_conversion_data', fb_conversion_data);
            if (env.FB_CONVERSION_PIXEL_ID !== '') {
                if (!$window.fbq) {
                    console.log('FB_CONVERSION_PIXEL not properly loaded - not tracking', $window.fbq);
                } else {
                    $window.fbq(['track', 'CompleteRegistration', fb_conversion_data]);
                }
            }

            // Google AdWords conversion tracking
            var adwords_conversion_data = {
                google_conversion_id: env.ADWORDS_CONVERSION_ID,
                google_conversion_language: "en",
                google_conversion_format: "3",
                google_conversion_color: "ffffff",
                google_conversion_label: env.ADWORDS_CONVERSION_LABEL,
                google_conversion_value: profile.user_metadata.signup_conversion_value || '0',
                google_conversion_currency: "USD"
            };
            //console.log('adwords_conversion_data', adwords_conversion_data);
            if (env.ADWORDS_CONVERSION_ID !== '') {
                $window.google_trackConversion && $window.google_trackConversion(adwords_conversion_data);
            }

        };
        $rootScope.$on('user.login', function (event, profile) {

            console.log('user.login updateTrackersAtSignup-trigger in angular-frontend-config', event);

            // At last, check if a sign-up has been reported for this user
            if (!profile.user_metadata.signup_tracked) {
                console.log('Note: no profile.user_metadata.signup_tracked');

                // Track signup
                updateTrackersAtSignup(profile);

                // Update the current user object
                profile.user_metadata.signup_tracked = true;

                // Store property so that we don't track signup again for this user
                var updatedAttributes = {"user_metadata": {"signup_tracked": true}};
                AuthService.updateProfile(profile, updatedAttributes, function () {
                }, function (error) {
                    // Handle error/result
                    console.log('save signup_tracked callback', error);
                });

            }

        });
    })

    .run(function ($rootScope, $state, $location, AuthService, $window) {
        /**
         user_id: A unique identifier of the user per identity provider, same for all apps (e.g.: google-oauth2|103547991597142817347). ALWAYS GENERATED                // Notice that the primary user_id is referring to the first identity the user authenticated with (Google in the example). Also, all user properties will continue to be those of the primary identity.
         name: The full name of the user (e.g.: John Foo). ALWAYS GENERATED
         email: Email of the user. (if available from provider. E.g. Twitter won't give you one. If using Facebook or Windows Live, you will have to ask for extra user consent).
         email_verified: Whether the email of the user has been verified. When using Database Connections an email is sent to the user on signup with a link that sets. When using Enterprise or Social Connections this flag comes from the identity provider. Email verification can be turned on/off on the Dashboard under the Emails section.
         nickname: User name (if available, might not be unique across identity providers). ALWAYS GENERATED
         picture: URL pointing to the user picture (if not available, will use gravatar.com with the email). ALWAYS GENERATED
         given_name: First name of the user (if available).
         family_name: Last name of the user (if available).
         */
        var updateMixpanelAtLogin = function (profile) {

            // Mixpanel
            $window.mixpanel.identify(profile.user_id)
            $window.mixpanel.track(
                "user.login"
            );
            var created_at = new Date(profile.created_at);
            var last_login_at = new Date();
            var mixpanel_data = {
                "$email": profile.email,
                "$first_name": profile.given_name ? profile.given_name : profile.name.split(' ').slice(0, -1).join(' '),
                "$last_name": profile.family_name ? profile.family_name : profile.name.split(' ').slice(-1).join(' '),
                "$created": created_at,
                "$last_login": last_login_at,
                "signup_plan": profile.user_metadata.signup_plan,
                "picture": profile.picture,
                "auth0_user_id": profile.user_id,
                "auth0_updated_at": profile.updated_at,
                "auth0_nickname": profile.nickname,
                "auth0_last_login_at": last_login_at,
                "auth0_email_verified": profile.email_verified

            };
            console.log('mixpanel_data', mixpanel_data);
            $window.mixpanel.people.set(mixpanel_data);

        };

        var aliasMixpanelOncePerUser = function (profile, ready) {

            // Mixpanel aliasing - once per user

            console.log('profile.user_metadata.original_mixpanel_distinct_id', profile.user_metadata.original_mixpanel_distinct_id);

            var current_mixpanel_distinct_id = $window.mixpanel.get_distinct_id();

            console.log('current_mixpanel_distinct_id', current_mixpanel_distinct_id);

            var stored = profile.user_metadata.original_mixpanel_distinct_id;
            if (!stored || stored === '') {

                // All subsequent events sent bearing that distinct_id will have their distinct_id values over-written with the original value that had been sent by the user before alias was called
                // Callback structure from http://stackoverflow.com/questions/18584550/how-can-i-trigger-a-callback-on-mixpanel-alias-success
                $window.mixpanel.track('$create_alias', {'alias': profile.user_id}, function () {

                    // Update the current user object
                    profile.user_metadata.original_mixpanel_distinct_id = current_mixpanel_distinct_id;

                    // Store property so that we don't run alias again for this user
                    var updatedAttributes = {"user_metadata": {"original_mixpanel_distinct_id": current_mixpanel_distinct_id}};
                    AuthService.updateProfile(profile, updatedAttributes, function () {
                        // Continue flow
                        ready(profile);
                    }, function (error) {
                        // Handle error/result
                        console.log('save original_mixpanel_distinct_id callback', error);
                    });

                });

            } else {
                // Continue flow
                ready(profile);
            }

        };

        $rootScope.$on('user.login', function (event, profile) {

            console.log('user.login Mixpanel-trigger in angular-frontend-config', event);

            if (!$window.mixpanel) {
                console.log('Mixpanel not loaded - not tracking', $window.mixpanel);
                return;
            }

            // Wait until mixpanel is initiated = get_distinct_id is available (mixpanel's loaded-callback is not useful in async situations like these)
            $rootScope.mixpanel = $window.mixpanel;
            var stopWatching = $rootScope.$watch(function () {
                return mixpanel.get_distinct_id;
            }, function (get_distinct_id) {
                console.log('Mixpanel watch-callback', get_distinct_id);
                if (get_distinct_id) {

                    aliasMixpanelOncePerUser(profile, function (profile) {
                        updateMixpanelAtLogin(profile);
                    });

                    stopWatching();
                }
            });

        });
    })

    .run(function ($rootScope, $state, $location, AuthService, $window) {

        var updateIntercomAtLogin = function (profile) {

            // Intercom
            var created_at = new Date(profile.created_at);
            var last_login_at = new Date();
            var intercom_data = {
                app_id: env.INTERCOM_ID,
                user_id: profile.user_id,
                name: profile.name,
                email: profile.email,
                created_at: Math.floor(created_at / 1000),
                "signup_plan": profile.user_metadata.signup_plan,
                "picture": profile.picture,
                "original_mixpanel_distinct_id": profile.user_metadata.original_mixpanel_distinct_id,
                "auth0_user_id": profile.user_id,
                "auth0_updated_at": profile.updated_at,
                "auth0_given_name": profile.given_name,
                "auth0_family_name": profile.family_name,
                "auth0_last_login_at": last_login_at,
                "auth0_email_verified": profile.email_verified
            };
            // Replicate data into app-specific data for multi-app tracking/detection
            intercom_data[env.INTERCOM_APP_TAG + '_original_mixpanel_distinct_id'] = intercom_data.original_mixpanel_distinct_id;
            intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_id'] = intercom_data.auth0_user_id;
            intercom_data[env.INTERCOM_APP_TAG + '_auth0_updated_at'] = intercom_data.auth0_updated_at;
            intercom_data[env.INTERCOM_APP_TAG + '_auth0_given_name'] = intercom_data.auth0_given_name;
            intercom_data[env.INTERCOM_APP_TAG + '_auth0_family_name'] = intercom_data.auth0_family_name;
            intercom_data[env.INTERCOM_APP_TAG + '_auth0_last_login_at'] = intercom_data.auth0_last_login_at;
            intercom_data[env.INTERCOM_APP_TAG + '_auth0_email_verified'] = intercom_data.auth0_email_verified;
            console.log('intercom_data', intercom_data);

            // Wait until Intercom is loaded to $window, then "boot" Intercom
            var stopWatching = $rootScope.$watch(function () {
                return $window.Intercom;
            }, function (Ic) {
                console.log('Intercom watch-callback', Ic);
                if (Ic) {

                    $window.Intercom('boot', intercom_data);
                    $rootScope.IntercomBootstrapped = true;
                    console.log('$rootScope.IntercomBootstrapped', $rootScope.IntercomBootstrapped);

                    stopWatching();
                }
            });

        };

        $rootScope.$on('user.login', function (event, profile) {

            console.log('user.login Intercom-trigger in angular-frontend-config', event);

            updateIntercomAtLogin(profile);

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            $window.Intercom && $window.Intercom('update');

        });

    });

export default module;
