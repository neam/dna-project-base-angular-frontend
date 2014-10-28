describe('locale', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $q,
        ConfigService,
        ApiService,
        LocaleService;

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

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should load locale options', function() {
        var locales = {
            "es": {
                "name": "Español",
                "direction": "ltr"
            },
            "ja": {
                "name": "日本語",
                "direction": "ltr"
            }
        };

        $httpBackend.expectGET(ApiService.getApiUrl('/language/list')).respond(locales);

        LocaleService.loadLocaleOptions()
            .then(function() {
                var japanese = LocaleService.getLocaleOptions()['ja'].name;
                expect(japanese).toBe('日本語');
            });

        $httpBackend.flush();
    });

    it('should determine text direction', function() {
        LocaleService.setCurrentLocale('fa');
        expect(LocaleService.getTextDirection()).toBe('rtl');
    });
});
