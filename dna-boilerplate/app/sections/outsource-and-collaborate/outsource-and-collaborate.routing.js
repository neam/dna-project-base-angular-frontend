'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - Outsource & Collaborate
     */
        .state('root.outsource-and-collaborate', {
            abstract: true,
            url: "/stay-outsource-and-collaborate",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "OutsourceAndCollaborateController",
                },
                'sidebar@root': {
                    template: require("project/sections/outsource-and-collaborate/navigation.html"),
                }
            },
            data: {
                requiresLogin: true,
                pageTitle: 'Outsource & Collaborate',
                showSideMenu: true
            }
        })

        .state('root.outsource-and-collaborate.overview', {
            url: "/overview",
            template: require("project/sections/outsource-and-collaborate/overview.html"),
            data: {pageTitle: 'Stay outsource-and-collaborate'}
        })

        .state('root.outsource-and-collaborate.overview.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.outsource-and-collaborate.overview');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * Section - Outsource & Collaborate
         */
        .state('root.api-endpoints.existing.outsource-and-collaborate', {
            abstract: true,
            url: "/outsource-and-collaborate",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "OutsourceAndCollaborateController",
                },
                'sidebar@root': {
                    template: require("project/sections/outsource-and-collaborate/navigation.html"),
                }
            },
            data: {
                pageTitle: 'Outsource & Collaborate',
                showSideMenu: true
            }
        })

        .state('root.api-endpoints.existing.outsource-and-collaborate.overview', {
            url: "/overview",
            template: require("project/sections/outsource-and-collaborate/overview.html"),
            data: {pageTitle: 'Outsource & Collaborate'}
        })

}

export default angular
    .module('outsource-and-collaborate.routing', [])
    .config(routing);
