(function () {

    var module = angular.module('section-import', []);

    module.controller('ImportController', function ($log, $scope, $modal, editImportSessionControllerService, $location, importSessionResource, inputResultResource,
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
        $scope.importScope.importSession = null;
        $scope.$watch('importScope.importSession', function (newVal, oldVal) {
            if (newVal && newVal.item_type === 'import_session') {
                editImportSessionControllerService.loadIntoScope($scope, newVal);
            }
        });

        // Used to restrict all visible items to those stemming from a certain import session
        $scope.activateImportSessionFilter = function (importSession) {
            $location.search('cf_ImportSessionManyManyFile_import_session_id', importSession.id);
            $location.search('cf_Foo_Interpretation_Clue_InputResult_import_session_id', importSession.id);
            $location.search('cf_Interpretation_Clue_InputResult_import_session_id', importSession.id);
            $location.search('cf_Clue_InputResult_import_session_id', importSession.id);
            $location.search('cf_InputResult_import_session_id', importSession.id);

            importSession.$promise = importSessions.$promise;
            importSession.$resolved = importSessions.$resolved;
            $scope.importScope.importSession = importSession;
            //$scope.importScope.importSession = importSessionResource.get({id: importSession.id});
        };
        $scope.deActivateImportSessionFilters = function () {
            $location.search('cf_ImportSessionManyManyFile_import_session_id', null);
            $location.search('cf_Foo_Interpretation_Clue_InputResult_import_session_id', null);
            $location.search('cf_Interpretation_Clue_InputResult_import_session_id', null);
            $location.search('cf_Clue_InputResult_import_session_id', null);
            $location.search('cf_InputResult_import_session_id', null);
            $scope.importScope.importSession = null;
        };

    });

})();