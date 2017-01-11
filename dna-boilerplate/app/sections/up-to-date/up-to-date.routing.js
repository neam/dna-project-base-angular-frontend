'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - 4. Stay up-to-date
     */
        .state('root.up-to-date', {
            abstract: true,
            url: "/stay-up-to-date",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "UpToDateController",
                },
                'sidebar@root': {
                    template: require("project/sections/up-to-date/navigation.html"),
                }
            },
            data: {
                requiresLogin: true,
                pageTitle: '4. Stay up-to-date',
                showSideMenu: true
            }
        })

        .state('root.up-to-date.overview', {
            url: "/overview",
            template: require("project/sections/up-to-date/overview.html"),
            data: {pageTitle: 'Stay up-to-date'}
        })

        .state('root.up-to-date.overview.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.up-to-date.overview');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * Section - 4. Stay up-to-date
         */
        .state('root.api-endpoints.existing.up-to-date', {
            abstract: true,
            url: "/stay-up-to-date",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "UpToDateController",
                },
                'sidebar@root': {
                    template: require("project/sections/up-to-date/navigation.html"),
                }
            },
            data: {
                pageTitle: '4. Stay up-to-date',
                showSideMenu: true
            }
        })

        .state('root.api-endpoints.existing.up-to-date.overview', {
            url: "/overview",
            template: require("project/sections/up-to-date/overview.html"),
            data: {pageTitle: 'Stay up-to-date'}
        })

}

export default angular
    .module('up-to-date.routing', [])
    .config(routing);
