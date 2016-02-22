(function () {

    var module = angular.module('section-import', []);

    module.controller('ImportController', function ($log, $scope, $modal,
                                                    inboxQueries,
                                                    inboxQueryResponses,
                                                    importSessions,
                                                    inputResults) {

        $scope.inboxQueries = inboxQueries;
        $scope.inboxQueryResponses = inboxQueryResponses;
        $scope.importSessions = importSessions;
        $scope.inputResults = inputResults;

    });

})();