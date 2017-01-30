'use strict';

let env = require('shared/scripts/env');

function routing($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('root', {
            abstract: true,
            url: "",
            template: require("project/views/common/content_hybrid_navigation.html"),
            //template: require("project/views/common/content_top_navigation.html"),
            //template: require("project/views/common/content.html"),
            resolve: {
                // Avoid FOUC by waiting for optimizely variation data to be available before rendering page
                optimizelyVariation: function ($window) {
                    return $window.optimizelyVariationDeferred.promise();
                }
            },
            data: {showSideMenu: false}
        })

        /**
         * Default "start" route
         */
        .state('root.start', {
            url: "",
            template: require("project/views/start.html"),
            data: {pageTitle: 'Start'}
        })
        .state('root.starttrailingslash', {
            url: "/",
            template: require("project/views/start.html"),
            data: {pageTitle: 'Start'}
        })

        /**
         * Scroll-to sections on start page
         */
        .state('root.start.features', {
            url: "/",
            onEnter: function (smoothScroll) {
                // scroll to #content
                var element = document.getElementById('content');
                smoothScroll(element);
            },
            data: {pageTitle: 'Start'}
        })
        .state('root.start.pricing', {
            url: "/",
            onEnter: function (smoothScroll) {
                // scroll to #main-plan
                var element = document.getElementById('main-plan');
                smoothScroll(element);
            },
            data: {pageTitle: 'Start'}
        })
        .state('root.start.processes', {
            url: "/",
            onEnter: function (smoothScroll) {
                // scroll to #processes
                var element = document.getElementById('processes');
                smoothScroll(element);
            },
            data: {pageTitle: 'Start'}
        })
        .state('root.start.contact', {
            url: "/",
            onEnter: function (smoothScroll) {
                // scroll to #faq
                var element = document.getElementById('contact');
                smoothScroll(element);
            },
            data: {pageTitle: 'Start'}
        })

        /**
         * Request invite
         */

        .state('root.start.user.request-invite', {
            url: "/request-invite",
            onEnter: function (AuthService) {
                Intercom('onHide', _.once(function () {
                    AuthService.goAfterLogin();
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * FAQ route
         */
        .state('root.faq', {
            url: "/faq",
            template: require("project/views/faq.html"),
            data: {pageTitle: 'FAQ'}
        })

    /**
     * Wizard steps
     */
    /*
     .state('forms.wizard', {
     url: "/wizard",
     template: require("project/views/form_wizard.html"),
     controller: wizardCtrl,
     data: {pageTitle: 'Wizard form'},
     resolve: {
     loadPlugin: function ($ocLazyLoad) {
     return $ocLazyLoad.load([
     {
     files: ['css/plugins/steps/jquery.steps.css']
     }
     ]);
     }
     }
     })
     .state('forms.wizard.step_one', {
     url: '/step_one',
     templateUrl: 'views/wizard/step_one.html',
     data: {pageTitle: 'Wizard form'}
     })
     .state('forms.wizard.step_two', {
     url: '/step_two',
     templateUrl: 'views/wizard/step_two.html',
     data: {pageTitle: 'Wizard form'}
     })
     .state('forms.wizard.step_three', {
     url: '/step_three',
     templateUrl: 'views/wizard/step_three.html',
     data: {pageTitle: 'Wizard form'}
     })
     */
    ;

}

export default angular
    .module('app.routing', [])
    .config(routing);
