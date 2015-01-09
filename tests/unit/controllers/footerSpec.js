describe('footer', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $scope,
        $q,
        configManager,
        api,
        LocaleService,
        FooterCtrl;

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _configManager_, _api_, _LocaleService_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        configManager = _configManager_;
        api = _api_;
        LocaleService = _LocaleService_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();

        FooterCtrl = $controller('FooterCtrl', {
            $scope: $scope
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should load footer items', function() {
        LocaleService.setCurrentLocale('en_us');

        $httpBackend.expectGET(api.getApiUrl('/footer/en_us')).respond({
            "en_us": {
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
                expect($scope.footerItems['en_us']).toBeDefined();
            });

        $httpBackend.flush();
    });

    it('should return Twitter icon class', function() {
        var iconClass = $scope.getSocialLinkIconClass('Twitter');
        expect(iconClass).toBe('fa-twitter');
    });
});
