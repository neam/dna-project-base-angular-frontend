(function () {
    var app = angular.module('app', [
        'angular-frontend',
        'ngResource',                   // $resource
        //'modelFactory',                 // angular-model-factory
        //'multiStepForm',                // angular-multi-step-form
        'googlechart',                  // angular-google-chart
        'ng-optimizely',                // optimizely
        'angularDc',
        //'ngHandsontable',
        'simpleHandsontable',
        'angular-filepicker',
        'cfp.hotkeys',                  // angular-hotkeys
        '3-way-merge',                  // 3-way-merge
        'rt.select2',                   // angular-select2
        'daterangepicker',              // angular-daterangepicker
        'smoothScroll',                 // ngSmoothScroll
        'dcNasdaq',                     // necessary for scripts/dc/dc-nasdaq-controller.js
        //'angularJade',
        //'section-basic-info',
    ]);

    /**
     * Service to handle data-change suggestions via the angular ui
     */
    app.service('suggestionsService', function ($http, $location, $injector, contentFilters) {

        var statuses = {
            ACTIVE: 'active',
            INACTIVE: 'inactive',
            LOADING: 'loading',
            ERROR: 'error'
        };

        var status = statuses.INACTIVE;

        var suggestionsService = {
            status: status,
            statuses: statuses,
            suggest: function (suggestions, save) {

                console.log('suggest - suggestions, save', suggestions, save);

                var params = angular.extend({}, {
                    'suggestions': suggestions,
                    'save': save,
                    'filters': contentFilters.all(),
                    'default_page': 1,
                    'default_limit': 100
                });

                status = statuses.LOADING;
                $http.post(env.API_BASE_URL + '/' + env.API_VERSION + '/suggestions', params).
                then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    console.log('suggestions received', response);

                    _.each(response.data, function (value, key, list) {

                        $injector.invoke([key, function (resource) {

                            resource.replace(value.items);
                            resource.$metadata = value._meta;

                        }]);

                    });

                    if (save) {
                        status = statuses.INACTIVE;
                    } else {
                        status = statuses.ACTIVE;
                    }

                }, function (response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    status = statuses.ERROR;
                    console.log('error during suggestions received', response);

                });

            },
            status: function () {
                return status;
            }
        };

        return suggestionsService;

    });

    /**
     * Service to fetch metadata from the api (not sure if still used)
     */
    app.factory('metadataService', function ($http) {

        var factory = {};

        factory.getMetadataPromise = function () {
            return $http({
                url: env.API_BASE_URL + '/' + env.API_VERSION + '/metadata',
                method: 'GET'
            });
        };

        return factory;

    });

    /**
     * Service used to hold information about route-based content filters, such as when visiting an item's page, only show items related to that item
     */
    app.service('routeBasedContentFilters', function () {

        return {};

    });

    /**
     * Service to extract information about current content filters
     * Content filters are stored in $location.search (prefixed with cf_) and the service routeBasedContentFilters
     */
    app.service('contentFilters', function ($location, routeBasedContentFilters) {

        return {
            all: function () {

                // Filter by cf_ namespace
                var locationBasedContentFilters = _.reduce($location.search(), function (obj, val, key) {
                    if (key.indexOf("cf_") === 0) {
                        obj[key.replace("cf_", "")] = val;
                    }
                    return obj;
                }, {});

                var allContentFilters = angular.merge({}, locationBasedContentFilters, routeBasedContentFilters);

                return allContentFilters;

            },
            itemTypeSpecific: function (itemType) {

                var allContentFilters = this.all();

                // Filter on item type by item type namespace
                return _.reduce(allContentFilters, function (obj, val, key) {
                    if (key.indexOf(itemType + "_") === 0) {
                        obj[key] = val;
                    }
                    return obj;
                }, {});

            }
        };

    });

    /**
     * Service used to hold information about route-based visibility settings, such as when visiting a specific curate step, only show columns relevant to that step
     */
    app.service('routeBasedVisibilitySettings', function () {

        return {};

    });

    /**
     * Service to extract information about current visibility settings
     * Content visibility settings are stored in $location.search (prefixed with vs_) and the service routeBasedVisibilitySettings
     */
    app.service('visibilitySettings', function ($location, routeBasedVisibilitySettings) {

        var visibilitySettings = {
            all: function () {

                // Filter by vs_ namespace
                var locationBasedVisibilitySettings = _.reduce($location.search(), function (obj, val, key) {
                    if (key.indexOf("vs_") === 0) {
                        obj[key.replace("vs_", "")] = val;
                    }
                    return obj;
                }, {});

                var allVisibilitySettings = angular.merge({}, locationBasedVisibilitySettings, routeBasedVisibilitySettings);

                return allVisibilitySettings;

            },
            itemTypeSpecific: function (itemType) {

                var allVisibilitySettings = this.all();

                // Filter on item type by item type namespace
                return _.reduce(allVisibilitySettings, function (obj, val, key) {
                    if (key.indexOf(itemType + "_") === 0) {
                        obj[key] = val;
                    }
                    return obj;
                }, {});

            }
        };

        return visibilitySettings;

    });

    /**
     * Service that intercepts requests, can be used to show general error messages on failed requests
     */
    app.factory('appInterceptor', function ($rootScope, $q, DataEnvironmentService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                // Supply header indicating which data profile we should use for the request
                if (DataEnvironmentService.activeDataEnvironment.available) {
                    config.headers['X-Data-Profile'] = env.DATA || 'clean-db';
                }
                //config.withCredentials = true;
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    console.log('unauthorized request intercepted by authInterceptor');
                }
                if (response.status === 403) {
                    // handle the case where the user is not authorized
                    console.log('forbidden request intercepted by authInterceptor');
                }
                return response || $q.when(response);
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('appInterceptor');
    });

    // http://stackoverflow.com/a/24519069/682317
    app.filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    // http://stackoverflow.com/a/25344423/682317
    app.directive('emptyToNull', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function (viewValue) {
                    if (viewValue === "") {
                        return null;
                    }
                    return viewValue;
                });
            }
        };
    });

    app.directive('dnaFileSelectionWidget', function (files, fileResource, fileInstanceResource, filepickerService) {
        return {
            restrict: 'E',
            require: '?ngModel',
            scope: {
                file: '=',
                files: '=',
                ngModel: '=',
                previewHeightPixels: '=', // Filepicker preview widget requires a fixed amount of pixels as height parameter, can't be set via css :/
                multiple: '@', // true, false (default)
                // TODO:
                name: '@',
                mediaLibrary: '@', // none, select2, file-manager
                existingSelection: '@', // unmodified, replace (default), add
                restrictions: '@'
            },
            templateUrl: 'views/widgets/dna-file-selection-widget.html',
            link: function (scope, element, attrs, ngModel) {

                if (!scope.files) {
                    scope.files = (scope.file && scope.file.id) ? [scope.file] : [];
                }

                // Set default to 200px
                scope.previewHeightPixels = scope.previewHeightPixels || 200;

                /*
                 scope.pickFile = pickFile;
                 function pickFile() {
                 filepickerService.pick(
                 {mimetype: '* /*'},
                 onSuccess
                 );
                 };
                 */

                scope.onSuccess = onSuccess;

                function onSuccess(event) {
                    console.log('event', event);
                    if (event.fpfiles) {
                        angular.forEach(event.fpfiles, function (file, key) {
                            createFileFromFpfile(file);
                        });
                    } else {
                        createFileFromFpfile(event.fpfile);
                    }
                };

                scope.getPreviewUrl = getPreviewUrl;

                function getPreviewUrl(file) {
                    if (!file || !file.absolute_url) {
                        return null;
                    }
                    if (file.absolute_url.indexOf("//cdn.filepicker.io/") >= 0) {
                        return file.absolute_url;
                    }
                    return null;
                };

                /**
                 * Creates a file on the server and sets the file as scope.file
                 * @param fpfile
                 */
                function createFileFromFpfile(fpfile) {

                    /*
                     file_instance:
                     uri
                     "https://www.filepicker.io/api/file/PFQvWzg0yuUzpLNl7l2Z"
                     data_json
                     container: "user-data-uploads"
                     client: "computer"
                     id: 1
                     isWriteable: true
                     key: "UsQmYb1MIhbKirZTmQXC_kitten.jpg"
                     url: "https://www.filepicker.io/api/file/PFQvWzg0yuUzpLNl7l2Z"

                     file:
                     filename: "kitten.jpg"
                     original_filename: "kitten.jpg"
                     mimetype: "image/jpeg"
                     size: 32142
                     */

                    // Default behavior is to create a new file item and then replace the existing id with the id of the new file item
                    var fileInstance = angular.extend({}, fileInstanceResource.dataSchema());

                    fileInstance.attributes.storage_component_ref = 'filepicker';
                    fileInstance.attributes.uri = fpfile.url;
                    fileInstance.attributes.data_json = JSON.stringify(fpfile);

                    var file = angular.extend({}, fileResource.dataSchema());

                    file.attributes.size = fpfile.size;
                    file.attributes.mimetype = fpfile.mimetype;
                    file.attributes.filename = fpfile.filename;
                    file.attributes.original_filename = fpfile.filename;
                    file.attributes.fileInstances.push(fileInstance);

                    // create a new file item
                    files.add(file, function (createdFile) {
                        if (scope.multiple) {
                            // append the new id to the list of existing ids
                            var currentValue = ngModel.$viewValue || [];
                            currentValue.push(createdFile.id);
                            ngModel.$setViewValue(currentValue);
                        } else {
                            // replace the existing id with the id of the new file item
                            ngModel.$setViewValue(createdFile.id);
                        }
                        ngModel.$setDirty()
                        // update file(s) preview
                        scope.file = createdFile;
                        if (!scope.multiple) {
                            scope.files.length = 0;
                        }
                        createdFile.previewUrl = getPreviewUrl(scope.file);
                        scope.files.push(createdFile);
                    });

                };

                // Preview url(s) extraction
                scope.previewUrl = getPreviewUrl(scope.file);

                // Update preview-urls when ngModel changes
                scope.$watch('file', function (newVal, oldVal) {
                    scope.previewUrl = getPreviewUrl(newVal);
                });

            }
        };
    });

    app.directive('dnaItemSelectionWidget', function () {
        return {
            restrict: 'E',
            require: '?ngModel',
            scope: {
                collection: '=',
                item: '=',
                items: '=',
                ngModel: '=',
                multiple: '@', // true, false (default)
                viewPath: '@'
            },
            templateUrl: 'views/widgets/dna-item-selection-widget.html',
            link: function (scope, element, attrs, ngModel) {

                /*
                 onEnter: function ($modal, $state, campaign) {
                 var modalOptions = {
                 templateUrl: "crud/campaign/modal-view.html",
                 controller: "viewCampaignController",
                 size: "lg",
                 animation: true,
                 resolve: {
                 campaign: function () {
                 return campaign;
                 }
                 }
                 };
                 modalInstance = $modal.open(modalOptions);
                 modalInstance.result['finally'](function () {
                 modalInstance = null;
                 if ($state.$current.name === 'root.api-endpoints.existing.campaigns.existing.view') {
                 $state.go('^.^.list');
                 }
                 if ($state.$current.name === 'root.api-endpoints.existing.campaigns.existing.edit.preview') {
                 $state.go('^.continue-editing');
                 }
                 });
                 },
                 onExit: function () {
                 if (modalInstance) {
                 modalInstance.close();
                 }
                 },
                 */

            }
        };
    });

    /**
     * A widget to encapsulate paginated viewing and editing of a collection
     */
    app.directive('dnaCollectionCurationWidget', function () {
        return {
            restrict: 'E',
            require: '?collection',
            scope: {
                crud: '=',
                label: '=',
                templateUrl: '=',
                collection: '='
            },
            templateUrl: 'views/widgets/dna-collection-curation-widget.html',
            link: function (scope, element, attrs, ctrl) {

                console.log('dnaFileSelectionWidget link', scope, element, attrs, ctrl);

            }
        };
    })

})();