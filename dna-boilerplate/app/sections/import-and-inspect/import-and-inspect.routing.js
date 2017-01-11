'use strict';

function routing($stateProvider) {

    $stateProvider

    /**
     * WITHOUT END-POINT Section - 2. Import and organize
     */
        .state('root.import-and-inspect', {
            abstract: true,
            url: "/import-and-inspect",
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: "ImportAndOrganizeController",
                },
                'sidebar@root': {
                    template: require("project/sections/import-and-inspect/navigation.html"),
                }
            },
            resolve: {},
            data: {
                requiresLogin: true,
                pageTitle: 'Import and organize',
                showSideMenu: true
            }

        })

        .state('root.import-and-inspect.overview', {
            url: "/overview",
            template: require("project/sections/import-and-inspect/overview.html"),
            data: {pageTitle: 'Overview'}
        })

        .state('root.import-and-inspect.import', {
            abstract: true,
            url: "/import",
            template: "<ui-view/>",
        })

        .state('root.import-and-inspect.import.overview', {
            url: "/overview",
            template: require("project/sections/import-and-inspect/import.overview.html"),
            data: {pageTitle: 'Inspect'}
        })

        .state('root.import-and-inspect.import.overview.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.import-and-inspect.import.overview');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        .state('root.import-and-inspect.inspect', {
            abstract: true,
            url: "/organize",
            template: "<ui-view/>",
        })

        .state('root.import-and-inspect.inspect.overview', {
            url: "/overview",
            template: require("project/sections/import-and-inspect/inspect.overview.html"),
            data: {pageTitle: 'Inspect'}
        })

        .state('root.import-and-inspect.inspect.overview.request-invite', {
            url: "/request-invite",
            onEnter: function ($state) {
                Intercom('onHide', _.once(function () {
                    $state.go('root.import-and-inspect.inspect.overview');
                }));
                Intercom('showNewMessage', 'Hi! I would like to get Beta access to ' + env.SITENAME);
            },
            onExit: function () {
                Intercom('hide');
            },
            data: {pageTitle: 'request-invite'}
        })

        /**
         * Section - 2. Import and organize
         */
        .state('root.api-endpoints.existing.import-and-inspect', {
            abstract: true,
            url: "/import-and-inspect",
            views: {
                '': {
                    template: require("project/sections/import-and-inspect/wrapper.html"),
                    controller: "ImportAndOrganizeController",
                },
                'sidebar@root': {
                    template: require("project/sections/import-and-inspect/navigation.html")
                }
            },
            resolve: {
                setRouteBasedVisibilitySettingsLevel0: function (routeBasedVisibilitySettings, $stateParams) {
                    routeBasedVisibilitySettings.ClerkSupportingDocument_columns_by_step = 'supporting-documents.relevance';
                },
            },
            data: {
                pageTitle: '2. Import',
                showSideMenu: true
            }
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session', {
            abstract: true,
            url: "/:importSessionId",
            params: {importSessionId: {value: 'all', dynamic: true}},
            resolve: {
                setRouteBasedContentFiltersLevel1: function (setRouteBasedContentFiltersLevel0, routeBasedContentFilters, $stateParams) {
                    // Start of with empty lists before an import session is selected
                    var importSessionId = $stateParams.importSessionId === 'all' ? null : $stateParams.importSessionId;
                    routeBasedContentFilters.ImportSessionManyManyFile_import_session_id = importSessionId;
                    routeBasedContentFilters.Interpretation_Clue_InputResult_import_session_id = importSessionId;
                    routeBasedContentFilters.Clue_InputResult_import_session_id = importSessionId;
                    routeBasedContentFilters.InputResult_import_session_id = importSessionId;
                },
                currentImportSession: function (dataEnvironmentParam, $stateParams, importSessions) {
                    return importSessions.loadItem($stateParams.importSessionId);
                },
            },
            views: {
                '': {
                    template: "<ui-view/>",
                    controller: function (routeBasedContentFilters) {
                        this.uiOnParamsChanged = function (changedParams, $transition$) {
                            console.log('optionally-by-import-session - routes.uiOnParamsChanged', changedParams, $transition$);
                            if (changedParams.importSessionId) {
                                var importSessionId = changedParams.importSessionId === 'all' ? null : changedParams.importSessionId;
                                routeBasedContentFilters.ImportSessionManyManyFile_import_session_id = importSessionId;
                                routeBasedContentFilters.Interpretation_Clue_InputResult_import_session_id = importSessionId;
                                routeBasedContentFilters.Clue_InputResult_import_session_id = importSessionId;
                                routeBasedContentFilters.InputResult_import_session_id = importSessionId;
                            }
                        };
                    },
                },
            },
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session.overview', {
            url: "/overview",
            template: require("project/sections/import-and-inspect/overview.html"),
            data: {pageTitle: 'Import'}
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session.import', {
            abstract: true,
            url: "/import",
            template: "<ui-view/>",
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session.import.overview', {
            url: "/overview",
            template: require("project/sections/import-and-inspect/import.overview.html"),
            data: {pageTitle: 'Import'}
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session.import.images', {
            url: "/images",
            template: require("project/sections/import-and-inspect/import.images.html"),
            resolve: {},
            data: {pageTitle: 'Inspect'}
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session.inspect', {
            abstract: true,
            url: "/organize",
            template: "<ui-view/>",
        })

        .state('root.api-endpoints.existing.import-and-inspect.optionally-by-import-session.inspect.overview', {
            url: "/overview",
            template: require("project/sections/import-and-inspect/inspect.overview.html"),
            data: {pageTitle: 'Inspect'}
        })

}

export default angular
    .module('import-and-inspect.routing', [])
    .config(routing);
