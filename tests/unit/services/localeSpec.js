describe('LocaleService', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $q,
        configManager,
        api,
        LocaleService,
        languageApiPath = '/language',
        /**
         * @type {} mock locale options
         */
        localeOptions = {
            "es": {"name": "Español", "direction": "ltr"},
            "ja": {"name": "日本語", "direction": "ltr"}
        };

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

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        LocaleService.setCurrentLocale('en_us');
    });

    it('should load locale options', function() {
        $httpBackend.expectGET(api.getApiUrl(languageApiPath)).respond(localeOptions);

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

    it('should set and get current locale', function() {
        LocaleService.setCurrentLocale('es');
        expect(LocaleService.getCurrentLocale()).toBe('es');
    });

    it('should return current locale label', function() {
        $httpBackend.expectGET(api.getApiUrl(languageApiPath)).respond(localeOptions);

        LocaleService.loadLocaleOptions()
            .then(function() {
                LocaleService.setCurrentLocale('es');
                expect(LocaleService.getCurrentLocaleLabel()).toBe('Español');
            });

        $httpBackend.flush();
    });
});
