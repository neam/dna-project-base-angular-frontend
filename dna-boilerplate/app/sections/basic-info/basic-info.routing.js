'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - 0. Supply basic info
     */
        .state('root.basic-info', {
            abstract: true,
            url: "/basic-info",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "BasicInfoController"
                },
                'sidebar@root': {
                    template: require("project/sections/basic-info/navigation.html")
                }
            },
            data: {
                requiresLogin: true,
                pageTitle: '0. Supply basic info',
                showSideMenu: true
            }
        })

        .state('root.basic-info.overview', {
            url: "/overview",
            template: require("project/sections/basic-info/overview.html"),
            data: {pageTitle: 'Basic Info'}
        })

        /**
         * Section - 0. Supply basic info
         */
        .state('root.api-endpoints.existing.basic-info', {
            abstract: true,
            url: "/basic-info",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "BasicInfoController"
                },
                'sidebar@root': {
                    template: require("project/sections/basic-info/navigation.html")
                }
            },
            data: {
                pageTitle: 'Supply basic info',
                showSideMenu: true
            }
        })

        .state('root.api-endpoints.existing.basic-info.overview', {
            url: "/overview",
            template: require("project/sections/basic-info/overview.html"),
            data: {pageTitle: 'Basic Info'}
        })

        .state('root.api-endpoints.existing.basic-info.my-tax-entities', {
            url: "/my-tax-entities",
            template: require("project/sections/basic-info/my-tax-entities.html"),
            data: {pageTitle: 'Basic Info'}
        })

        .state('root.api-endpoints.existing.basic-info.financials', {
            url: "/financials",
            template: require("project/sections/basic-info/financials.html"),
            data: {pageTitle: 'Basic Info'}
        })

}

export default angular
    .module('basic-info.routing', [])
    .config(routing);
