/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/dashboards/dashboard_1");
    $urlRouterProvider.otherwise("/user/login");
    $stateProvider

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

        // Userapp
        .state('user', {
            abstract: true,
            url: "/user",
            templateUrl: "views/common/content.html",
        })
        .state('user.login', {
            url: "/login",
            templateUrl: "partials/login.html",
            data: { login: true, pageTitle: 'Login' }
        })
        .state('user.signup', {
            url: "/signup",
            templateUrl: "partials/signup.html",
            data: { public: true, plan: 'default', pageTitle: 'Signup' }
        })
        .state('user.verify-email', {
            url: "/verify-email",
            templateUrl: "partials/verify-email.html",
            data: { verify_email: true, pageTitle: 'Verify email' }
        })
        .state('user.reset-password', {
            url: "/reset-password",
            templateUrl: "partials/reset-password.html",
            data: { public: true, pageTitle: 'reset-password' }
        })
        .state('user.set-password', {
            url: "/set-password",
            templateUrl: "partials/set-password.html",
            data: { set_password: true, pageTitle: 'set-password' }
        })

    ;
}
angular
    .module('inspinia')
    .config(config)
    .run(function ($rootScope, $state, env, user) {
        $rootScope.$state = $state;
        $rootScope.env = env;
        user.init({ appId: env.USERAPP_ID });
        if (env.USE_USERAPP_MOCK_API === 'true') {
            UserApp.setBaseAddress('127.0.0.1:3000');
            UserApp.setSecure(false);
            UserApp.setDebug(true);
        }

        //console.log('run() - $rootScope',$rootScope);

        $rootScope.$on('user.signup', function (event, newUser) {

            //console.log('user.signup', event, newUser);

            // Mixpanel
            mixpanel.track(
                "user.signup", {
                    "signup_plan": newUser.properties.signup_plan
                }
            );

            // Facebook conversion tracking
            var valuemap = {
                'freemium': '0',
                'default': '0',
                'casual': '9',
                'ambitious': '24',
                'busy': '49',
            }
            var fb_conversion_data = {'value': (valuemap[newUser.properties.signup_plan] || '0'), 'currency': 'USD'};
            //console.log('fb_conversion_data', fb_conversion_data);
            if (env.FB_CONVERSION_PIXEL_ID !== '') {
                window._fbq && window._fbq.push(['track', env.FB_CONVERSION_PIXEL_ID, fb_conversion_data]);
            }

            // Google AdWords conversion tracking
            var adwords_conversion_data = {
                google_conversion_id: env.ADWORDS_CONVERSION_ID,
                google_conversion_language: "en",
                google_conversion_format: "3",
                google_conversion_color: "ffffff",
                google_conversion_label: env.ADWORDS_CONVERSION_LABEL,
                google_conversion_value: valuemap[newUser.properties.signup_plan] || '0',
                google_conversion_currency: "USD"
            };
            //console.log('adwords_conversion_data', adwords_conversion_data);
            if (env.ADWORDS_CONVERSION_ID !== '') {
                window.google_trackConversion && window.google_trackConversion(adwords_conversion_data);
            }

        });

        var updateTrackersAtLogin = function () {

            // Mixpanel
            mixpanel.identify(user.current.user_id)
            mixpanel.track(
                "user.login"
            );
            var last_login_at = new Date(user.current.last_login_at * 1000);
            var created_at = new Date(user.current.created_at * 1000);
            mixpanel_data = {
                "$email": user.current.email,
                "$first_name": user.current.first_name,
                "$last_name": user.current.last_name,
                "$created": created_at,
                "$last_login": last_login_at,
                "userapp_user_id": user.current.user_id,
                "signup_plan": user.current.properties.signup_plan.value,
            };
            //console.log('mixpanel_data', mixpanel_data);
            mixpanel.people.set(mixpanel_data);

            // Intercom
            var intercom_data = {
                app_id: env.INTERCOM_ID,
                name: user.current.first_name + (user.current.last_name ? ' ' + user.current.last_name : ''),
                email: user.current.email,
                created_at: user.current.created_at,
                "signup_plan": user.current.properties.signup_plan.value,
                "original_mixpanel_distinct_id": user.current.properties.original_mixpanel_distinct_id.value,
                "userapp_user_id": user.current.user_id,
                "userapp_updated_at": user.current.updated_at,
                "userapp_first_name": user.current.first_name,
                "userapp_last_name": user.current.last_name,
                "userapp_last_login_at": user.current.last_login_at,
                //"userapp_subscription": user.current.subscription,
                "userapp_email_verified": user.current.email_verified
            };
            //console.log('intercom_data', intercom_data);
            window.Intercom && window.Intercom('boot', intercom_data);

        }

        $rootScope.$on('user.login', function () {

            //console.log('user.login', user.current);

            // Mixpanel aliasing - once per user

            //console.log('user.current.properties.original_mixpanel_distinct_id', user.current.properties.original_mixpanel_distinct_id.value);

            var current_mixpanel_distinct_id = mixpanel.get_distinct_id();

            //console.log('current_mixpanel_distinct_id', current_mixpanel_distinct_id);

            var stored = user.current.properties.original_mixpanel_distinct_id.value;
            if (!stored || stored === '') {

                // All subsequent events sent bearing that distinct_id will have their distinct_id values over-written with the original value that had been sent by the user before alias was called
                // Callback structure from http://stackoverflow.com/questions/18584550/how-can-i-trigger-a-callback-on-mixpanel-alias-success
                mixpanel.track('$create_alias', {'alias': user.current.user_id}, function () {

                    // Update the current user object
                    user.current.properties.original_mixpanel_distinct_id.value = current_mixpanel_distinct_id;

                    // Store property so that we don't run alias again for this user
                    UserApp.User.save({
                        user_id: "self",
                        properties: {
                            original_mixpanel_distinct_id: {
                                value: current_mixpanel_distinct_id,
                                override: true
                            }
                        }
                    }, function (error, result) {
                        // Handle error/result
                        //console.log('save callback', error, result);

                        // Continue flow
                        updateTrackersAtLogin();
                    });

                });

            } else {
                // Continue flow
                updateTrackersAtLogin();
            }

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            window.Intercom && window.Intercom('update');

        });

    });