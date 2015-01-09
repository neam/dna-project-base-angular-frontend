describe('i18n', function() {
    var $rootScope,
        $controller,
        $httpBackend,
        $q,
        $compile,
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

    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _$compile_, _ApiService_, _LocaleService_, _i18nService_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $compile = _$compile_;
        ApiService = _ApiService_;
        LocaleService = _LocaleService_;
        i18nService = _i18nService_;

        LocaleService.setCurrentLocale(locale);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should translate a string as inner HTML', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var element = $compile('<p i18n="test:login|html"></p>')($rootScope);
            expect(element.html()).toBe('Kirjaudu');
        });

        $httpBackend.flush();
    });

    it('should translate a string as a placeholder', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var element = $compile('<p i18n="test:login|placeholder"></p>')($rootScope);
            expect(element.attr('placeholder')).toBe('Kirjaudu');
        });

        $httpBackend.flush();
    });

    it('should translate a plural phrase', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var element = $compile('<p i18n="test:user|html" i18n-options="{count: 3}"></p>')($rootScope);
            expect(element.html()).toBe('3 käyttäjää');
        });

        $httpBackend.flush();
    });

    it('should translate a string and replace a variable', function() {
        $httpBackend.expectGET(ApiService.getApiUrl(apiUrl)).respond(translations);

        i18nService.init().then(function() {
            var element = $compile('<p i18n="test:you-are|html" i18n-options="{username: \'John\'}"></p>')($rootScope);
            expect(element.html()).toBe('Sinä olet John');
        });

        $httpBackend.flush();
    });
});
