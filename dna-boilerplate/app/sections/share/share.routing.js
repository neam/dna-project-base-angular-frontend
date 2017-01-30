'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - Share
     */
        .state('root.share', {
            abstract: true,
            url: "/share",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "ShareController",
                },
                'sidebar@root': {
                    template: require("project/sections/share/navigation.html"),
                }
            },
            data: {
                pageTitle: 'Share',
                showSideMenu: true
            }
        })

        .state('root.share.overview', {
            url: "/overview",
            template: require("project/sections/share/overview.html"),
            data: {pageTitle: 'Share'}
        })

        .state('root.share.overview.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.share.overview');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * Section - Share
         */
        .state('root.api-endpoints.existing.share', {
            abstract: true,
            url: "/share",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "ShareController",
                },
                'sidebar@root': {
                    template: require("project/sections/share/navigation.html"),
                }
            },
            data: {
                pageTitle: 'Share',
                showSideMenu: true
            },
            resolve: {
                setRouteBasedVisibilitySettingsLevel0: function (routeBasedVisibilitySettings, $stateParams) {
                    routeBasedVisibilitySettings.ClerkLedger_columns_by_step = 'exported-files';
                },
            }

        })

        .state('root.api-endpoints.existing.share.overview', {
            url: "/overview",
            template: require("project/sections/share/overview.html"),
            data: {pageTitle: 'Share'}
        })

}

export default angular
    .module('share.routing', [])
    .config(routing);
