describe('footer', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $scope,
        $q,
        ConfigService,
        ApiService,
        LocaleService,
        FooterCtrl;

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _ConfigService_, _ApiService_, _LocaleService_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        ConfigService = _ConfigService_;
        ApiService = _ApiService_;
        LocaleService = _LocaleService_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();

        FooterCtrl = $controller('FooterCtrl', {
            $scope: $scope
        });

        $httpBackend.expectGET(ApiService.getApiUrl('/language/list')).respond({
            "en-US": {
                "name": "English (United States)",
                "direction": "ltr"
            }
        });

        $httpBackend.flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should load footer items', function() {
        $httpBackend.expectGET(ApiService.getApiUrl('/footer/en-US')).respond({
            "en-US": {
                "socialLinks": [
                    {
                        "label": "Twitter",
                        "url": "https://twitter.com/HansRosling"
                    },
                    {
                        "label": "Facebook",
                        "url": "https://www.facebook.com/gapminder.org"
                    }
                ]
            }
        });

        $scope.init()
            .then(function() {
                expect($scope.footerItems['en-US']).toBeDefined();
            });

        $httpBackend.flush();
    });

    it('should return Twitter icon class', function() {
        var iconClass = $scope.getSocialLinkIconClass('Twitter');
        expect(iconClass).toBe('fa-twitter');
    });
});
