(function () {

    var module = angular.module('section-import', []);

    module.controller('ImportAndOrganizeController', function ($q, $log, $scope, $modal,
                                                               editImportSessionControllerService, $location, importSessionResource, inputResultResource,
                                                               inboxQueries,
                                                               inboxQueryResponses,
                                                               importSessions,
                                                               inputResults) {

        $scope.inboxQueries = inboxQueries;
        $scope.inboxQueryResponses = inboxQueryResponses;
        $scope.importSessions = importSessions;
        $scope.inputResults = inputResults;

        // Ability to select an import session to focus on
        $scope.importScope = {};
        $scope.importScope.importSessionPanelIsCollapsed = true;
        $scope.importScope.importSession = null;
        $scope.$watch('importScope.importSession', function (newVal, oldVal) {
            if (newVal && newVal.item_type === 'import_session') {
                editImportSessionControllerService.loadIntoScope($scope, newVal);
            }
        });

        // Used to restrict all visible items to those stemming from a certain import session
        $scope.activateImportSessionFilter = function (importSession) {
            importSessions.goToCurrentItemState(importSession);
            importSession.$promise = importSessions.$promise;
            importSession.$resolved = importSessions.$resolved;
            $scope.importScope.importSession = importSession;
            //$scope.importScope.importSession = importSessionResource.get({id: importSession.id});
        };
        $scope.deActivateImportSessionFilters = function () {
            importSessions.goToCurrentItemState({id: 'all'});
            $scope.importScope.importSession = null;
        };

    });

})();