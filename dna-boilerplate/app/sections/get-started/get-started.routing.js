'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - Introduction
     */
        .state('root.get-started', {
            abstract: true,
            url: "/get-started",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "GetStartedController"
                },
                'sidebar@root': {
                    template: require("project/sections/get-started/navigation.html")
                }
            },
            data: {
                requiresLogin: true,
                pageTitle: 'Introduction',
                showSideMenu: true
            }
        })

        .state('root.get-started.introduction', {
            url: "/overview",
            template: require("project/sections/get-started/introduction.html"),
            data: {pageTitle: 'Introduction - Introduction'}
        })

        .state('root.get-started.what-to-get-done', {
            url: "/what-to-get-done",
            template: require("project/sections/get-started/what-to-get-done.html"),
            data: {pageTitle: '1. Decide how to use the tool - What to get done'}
        })

        .state('root.get-started.survey', {
            url: "/survey",
            template: require("project/sections/get-started/survey.html"),
            data: {pageTitle: '1. Decide how to use the tool - Survey'}
        })

        .state('root.get-started.introduction.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.get-started.introduction');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * Section - Introduction
         */
        .state('root.api-endpoints.existing.get-started', {
            abstract: true,
            url: "/get-started",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "GetStartedController"
                },
                'sidebar@root': {
                    template: require("project/sections/get-started/navigation.html")
                }
            },
            data: {
                pageTitle: '1. Decide how to use the tool',
                showSideMenu: true
            }
        })

        .state('root.api-endpoints.existing.get-started.introduction', {
            url: "/introduction",
            template: require("project/sections/get-started/introduction.html"),
            data: {pageTitle: '1. Decide how to use the tool - Introduction'}
        })

        .state('root.api-endpoints.existing.get-started.what-to-get-done', {
            url: "/what-to-get-done",
            template: require("project/sections/get-started/what-to-get-done.html"),
            data: {pageTitle: '1. Decide how to use the tool - What to get done'}
        })

        .state('root.api-endpoints.existing.get-started.survey', {
            url: "/survey",
            template: require("project/sections/get-started/survey.html"),
            data: {pageTitle: '1. Decide how to use the tool - Survey'}
        })

}

export default angular
    .module('get-started.routing', [])
    .config(routing);
