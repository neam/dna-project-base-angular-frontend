(function () {
    var app = angular.module('app', [
        'angular-frontend',
        // Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
        /*
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
        'ui.calendar',                  // angular-ui-calendar / fullcalendar
        '3-way-merge',                  // 3-way-merge
        'rt.select2',                   // angular-select2
        'daterangepicker',              // angular-daterangepicker
        'smoothScroll',                 // ngSmoothScroll
        'dcNasdaq',                     // necessary for scripts/dc/dc-nasdaq-controller.js
        //'angularJade',
        //'section-get-started',
        //'section-basic-info',
        */
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
            replacedResources: {},
            activeSuggestions: [],
            suggest: function (suggestions, save) {

                console.log('suggestionsService.suggest() - suggestions, save', suggestions, save);

                var self = this;

                _.each(suggestions, function (value, key, list) {
                    self.activeSuggestions.push(value);
                });

                self.query(save);

            },
            refresh: function () {

                console.log('suggestionsService.refresh()');

                var self = this;

                self.query(false);

            },
            submit: function () {

                console.log('suggestionsService.submit()');

                var self = this;

                self.query(true);

            },
            query: function (save) {

                console.log('suggestionsService.query() - save', save);

                var self = this;

                var params = angular.extend({}, {
                    'suggestions': self.activeSuggestions,
                    'save': save,
                    'filters': contentFilters.all(),
                    'default_page': 1,
                    'default_limit': 100
                });

                status = statuses.LOADING;
                $http.post(env.API_BASE_URL + '/' + env.API_VERSION + '/suggestions', params).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    console.log('suggestions received', response);

                    _.each(response.data, function (value, key, list) {

                        // Ignore statusLog development-messages
                        if (key === 'statusLog') {
                            return;
                        }

                        $injector.invoke([key, function (resource) {

                            // If first suggestions-query, store previously used data for easy reset
                            if (!self.replacedResources[key]) {
                                self.replacedResources[key] = angular.copy(resource);
                                self.replacedResources[key].$metadata = angular.copy(resource.$metadata);
                            }

                            // Replace with suggested data
                            resource.replace(value.items);
                            resource.$metadata = value._meta;

                        }]);

                    });

                    if (save) {
                        self.activeSuggestions = [];
                        self.replacedResources = [];
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
            },
            restore: function () {

                var self = this;

                self.activeSuggestions = [];

                _.each(self.replacedResources, function (value, key, list) {

                    $injector.invoke([key, function (resource) {

                        // Restore previously used data
                        resource.replace(value);
                        resource.$metadata = value.$metadata;
                        delete self.replacedResources[key];

                    }]);

                });
                status = statuses.INACTIVE;

            }
        };

        return suggestionsService;

    });

    /**
     * Service used to hold information about UI filters, such as when advanced or developer modes are not enabled, to not show UI elements for advanced users or developers
     */
    app.service('uiModes', function () {

        var modes = {
            NORMAL: 'normal',
            ADVANCED: 'advanced',
            DEVELOPER: 'developer',
            DEBUG: 'debug'
        };

        var uiModes = {
            current: modes.NORMAL,
            modes: modes,
            set: function (mode) {
                this.current = mode;
            },
            currentIsAtLeast: function (mode) {
                switch (mode) {
                    case modes.NORMAL:
                        return true;
                        break;
                    case modes.ADVANCED:
                        return (this.current == modes.DEBUG) || (this.current == modes.DEVELOPER) || (this.current == modes.ADVANCED);
                        break;
                    case modes.DEVELOPER:
                        return (this.current == modes.DEBUG) || (this.current == modes.DEVELOPER);
                        break;
                    case modes.DEBUG:
                        return this.current == modes.DEBUG;
                        break;
                }
                return false;
            }
        };

        return uiModes;

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

                var locationBasedContentFilters = this.locationBasedContentFilters();
                var allContentFilters = angular.merge({}, routeBasedContentFilters, locationBasedContentFilters);
                return allContentFilters;

            },
            locationBasedContentFilters: function () {

                // Filter by cf_ namespace
                var locationBasedContentFilters = _.reduce($location.search(), function (obj, val, key) {
                    if (key.indexOf("cf_") === 0) {
                        obj[key.replace("cf_", "")] = val;
                    }
                    return obj;
                }, {});

                return locationBasedContentFilters;

            },
            narrowDownToItemTypeSpecific: function (itemType, contentFiltersToNarrowDown) {

                // Filter on item type by item type namespace
                return _.reduce(contentFiltersToNarrowDown, function (obj, val, key) {
                    if (key.indexOf(itemType + "_") === 0) {
                        obj[key] = val;
                    }
                    return obj;
                }, {});

            },
            itemTypeSpecific: function (itemType) {

                var allContentFilters = this.all();
                return this.narrowDownToItemTypeSpecific(itemType, allContentFilters);

            },
            itemTypeSpecificLocationBasedContentFilters: function (itemType) {

                var locationBasedContentFilters = this.locationBasedContentFilters();
                return this.narrowDownToItemTypeSpecific(itemType, locationBasedContentFilters);

            },
            trueIfNonEmpty: function (filter) {
                return !angular.equals(filter, {});
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
     * Service used to access data resolved via the deferred object window.optimizelyVariation
     * This way, optimizely scripts can resolve window.optimizelyVariation in order to make that data accessible to angular templates:
     * window.optimizelyVariation.resolve(data);
     */
    app.service('optimizelyVariation', function (optimizely, optimizelyFallbackData, $window, $timeout) {

        console.log('optimizely variation data service init');
        var optimizelyVariation = {
            data: null,
            deferred: $window.optimizelyVariation
        };
        optimizelyVariation.deferred.done(function (data) {
            console.log('optimizely variation data deferred done');
            optimizelyVariation.data = data;
            // inform angular that we have updated the data by implicitly calling $apply via $timeout
            $timeout(function () {
                console.log('optimizely data in place');
            });
        });

        // Use fallback data if working offline or optimizely has not delivered the data within a certain timeframe
        if (env.OFFLINE_DEV === 'true') {
            optimizelyVariation.deferred.resolve(optimizelyFallbackData);
        } else {
            optimizely.loadProject();
            // Allow some time for optimizely data to arrive
            $timeout(function () {
                console.log('$timeout optimizely timeout');
                optimizelyVariation.deferred.resolve(optimizelyFallbackData);
            }, 2000);
        }

        return optimizelyVariation;

    });

    /**
     * Allows to render HTML via scope variables
     * Source: http://stackoverflow.com/a/25513186/682317
     */
    app.filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);

    /**
     * Add the DATA header to API requests 0 Friendly logging of unauthorized requests
     */
    app.factory('authInterceptor', function ($log, $q, DataEnvironmentService) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    // Supply header indicating which data profile we should use for the request
                    if (DataEnvironmentService.activeDataEnvironment.available && config.url.indexOf(env.API_BASE_URL) > -1) {
                        config.headers['X-Data-Profile'] = env.DATA || 'clean-db';
                    }
                    //config.withCredentials = true;
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401) {
                        // handle the case where the user is not authenticated
                        $log.warn('unauthorized request intercepted by authInterceptor');
                    }
                    if (response.status === 403) {
                        // handle the case where the user is not authorized
                        $log.warn('forbidden request intercepted by authInterceptor');
                    }
                    return $q.reject(response);
                },
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });

    /**
     * Display backend errors in frontend
     */
    app.factory('exceptionInterceptor', function ($log, $q, debugService) {
            return {
                responseError: function (response) {
                    if (response.status === 500) {
                        debugService.renderException(response.data);
                    }

                    return $q.reject(response);
                }
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('exceptionInterceptor');
        })
        .service('debugService', function ($log, $injector) {
            this.renderException = function (data) {
                return $injector.get('$modal').open({
                    templateUrl: 'modals/debug.html',
                    controller: 'DebugController',
                    size: "lg",
                    resolve: {
                        data: function () {
                            return data;
                        }
                    }
                });
            };
        })
        .controller('DebugController', function ($log, $scope, data, $modalInstance) {
            $scope.data = data;

            $scope.close = function () {
                $modalInstance.dismiss();
            };
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
                type: '@', // 'any' (default), 'video', 'image'
                preview: '@', // 'filestack' (default), 'none'
                previewHeightPixels: '=', // Filestack preview widget requires a fixed amount of pixels as height parameter, can't be set via css :/
                multiple: '@', // '', undefined (default)
                mimetypes: '@', // */* (default)
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

                // Take special care of the "multiple" attribute since it is minified during the build process from 'multiple="anything"' to 'multiple'
                // The value of scope.multiple will thus be either undefined or '', so we construct a proper boolean scope variable _multiple that we can use in views
                scope._multiple = typeof scope.multiple !== 'undefined' ? true : false;

                // Set defaults
                scope.previewHeightPixels = scope.previewHeightPixels || 200;
                scope.type = scope.type || 'any';
                if (!scope.mimetypes) {
                    switch (scope.type) {
                        case 'image':
                            scope.mimetypes = 'image/*,application/pdf';
                            scope.services = 'COMPUTER,WEBCAM,EVERNOTE,DROPBOX,GOOGLE_DRIVE,GMAIL,BOX,FTP,PICASA,URL,CONVERT';
                            break;
                        case 'take-picture':
                            scope.mimetypes = 'image/*';
                            scope.services = 'WEBCAM';
                            break;
                        case 'video':
                            scope.mimetypes = 'video/*';
                            scope.services = 'COMPUTER,DROPBOX,VIDEO,GOOGLE_DRIVE,GMAIL,BOX,URL,WEBCAM';
                            break;
                        default:
                        case 'any':
                            scope.mimetypes = '*/*';
                            scope.services = 'COMPUTER,WEBCAM,EVERNOTE,DROPBOX,GOOGLE_DRIVE,GMAIL,BOX,FTP,PICASA,URL,CONVERT';
                            break;
                    }
                }
                if (!scope.preview) {
                    switch (scope.type) {
                        case 'image':
                        case 'take-picture':
                            scope.preview = 'img-tag';
                            break;
                        case 'video':
                            scope.preview = 'video-player';
                            break;
                        default:
                        case 'any':
                            scope.preview = 'filestack';
                            break;
                    }

                }

                // Set creator policy and signature
                scope.policy = env.FILESTACK_CREATOR_POLICY;
                scope.signature = env.FILESTACK_CREATOR_SIGNATURE;

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
                    if (file.absolute_url.indexOf("//cdn.filestackcontent.com/") >= 0) {
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

                    fileInstance.attributes.storage_component_ref = 'filestack';
                    fileInstance.attributes.uri = fpfile.url;
                    fileInstance.attributes.data_json = JSON.stringify({
                        fpfile: fpfile,
                        fpkey: env.FILEPICKER_API_KEY
                    });

                    var file = angular.extend({}, fileResource.dataSchema());

                    file.attributes.size = fpfile.size;
                    file.attributes.mimetype = fpfile.mimetype;
                    file.attributes.filename = fpfile.filename;
                    file.attributes.original_filename = fpfile.filename;
                    file.attributes.filestackFileInstance = fileInstance;

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
                        ngModel.$setDirty();
                        // update file(s) preview
                        createdFile.previewUrl = getPreviewUrl(scope.file);
                        if (!scope.multiple) {
                            scope.file = createdFile;
                            scope.files.length = 0;
                            scope.files = [scope.file];
                        } else {
                            scope.files.push(createdFile);
                        }
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
                multiple: '@', // '', undefined (default)
                viewPath: '@',
                customTemplate: '@'
            },
            templateUrl: 'views/widgets/dna-item-selection-widget.html',
            link: function (scope, element, attrs, ngModel) {

                // Take special care of the "multiple" attribute since it is minified during the build process from 'multiple="anything"' to 'multiple'
                // The value of scope.multiple will thus be either undefined or '', so we construct a proper boolean scope variable _multiple that we can use in views
                scope._multiple = typeof scope.multiple !== 'undefined' ? true : false;

                scope.selectItem = function (selectedItem) {
                    console.log('selected item', selectedItem);
                    ngModel.$setViewValue(selectedItem ? selectedItem.id : null);
                    scope.item = selectedItem ? angular.copy(selectedItem) : {id: null};
                };

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