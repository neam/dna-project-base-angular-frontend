'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - 3. Get things done
     */
        .state('root.get-things-done', {
            abstract: true,
            url: "/get-things-done",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "GetThingsDoneController",
                },
                'sidebar@root': {
                    template: require("project/sections/get-things-done/navigation.html")
                }
            },
            data: {
                requiresLogin: true,
                pageTitle: '3. Get things done',
                showSideMenu: true
            }
        })

        .state('root.get-things-done.overview', {
            url: "/overview",
            template: require("project/sections/get-things-done/overview.html"),
            data: {pageTitle: 'Get Things Done'}
        })

        .state('root.get-things-done.overview.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.get-things-done.overview');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * Section - 3. Get things done
         */
        .state('root.api-endpoints.existing.get-things-done', {
            abstract: true,
            url: "/get-things-done",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "GetThingsDoneController",
                },
                'sidebar@root': {
                    template: require("project/sections/get-things-done/navigation.html")
                }
            },
            data: {
                pageTitle: '3. Get things done',
                showSideMenu: true
            }
        })

        .state('root.api-endpoints.existing.get-things-done.overview', {
            url: "/overview",
            template: require("project/sections/get-things-done/overview.html"),
            controller: "GetThingsDoneController",
            data: {
                pageTitle: '3. Get things done',
            }
        })

}

export default angular
    .module('get-things-done.routing', [])
    .config(routing);
