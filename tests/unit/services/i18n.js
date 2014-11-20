describe('i18nService', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $q,
        ApiService,
        LocaleService,
        i18nService,
        apiUrl = '/translateui/pages/fi',
        locale = 'fi',
        translations = {
            "test": {
                "login": "Kirjaudu",
                "user_plural": "__count__ käyttäjää",
                "you-are": "Sinä olet __username__"
            }
        };

    beforeEach(module('Gapminder'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _ApiService_, _LocaleService_, _i18nService_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        ApiService = _ApiService_;
        LocaleService = _LocaleService_;
        i18nService = _i18nService_;

        LocaleService.setCurrentLocale(locale);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should initialize service', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init()
            .then(function() {
                expect(i18nService.isReady).toBe(true);
            });

        $httpBackend.flush();
    });

    it('should translate a string', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var translation = i18nService.translate('test:login');
            expect(translation).toBe('Kirjaudu');
        });

        $httpBackend.flush();
    });

    it('should translate a plural phrase', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var translation = i18nService.translate('test:user', {count: 3});
            expect(translation).toBe('3 käyttäjää');
        });

        $httpBackend.flush();
    });

    it('should translate a string and replace a variable', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var translation = i18nService.translate('test:you-are', {username: 'Eric'});
            expect(translation).toBe('Sinä olet Eric');
        });

        $httpBackend.flush();
    });
});
