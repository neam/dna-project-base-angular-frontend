describe('localeManager', function() {
  var $rootScope,
    $controller,
    $httpBackend,
    $q,
    configManager,
    api,
    localeManager,
    languageApiPath = '/language',
    /**
     * @type {} mock locale options
     */
    localeOptions = {
      "es": {"name": "Español", "direction": "ltr"},
      "ja": {"name": "日本語", "direction": "ltr"}
    };

  beforeEach(module('Gapminder'));

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _configManager_, _api_, _localeManager_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    configManager = _configManager_;
    api = _api_;
    localeManager = _localeManager_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    localeManager.setCurrentLocale('en_us');
  });

  it('should load locale options', function() {
    $httpBackend.expectGET(api.getApiUrl(languageApiPath)).respond(localeOptions);

    localeManager.loadLocaleOptions()
      .then(function() {
        var japanese = localeManager.getLocaleOptions()['ja'].name;
        expect(japanese).toBe('日本語');
      });

    $httpBackend.flush();
  });

  it('should determine text direction', function() {
    localeManager.setCurrentLocale('fa');
    expect(localeManager.getTextDirection()).toBe('rtl');
  });

  it('should set and get current locale', function() {
    localeManager.setCurrentLocale('es');
    expect(localeManager.getCurrentLocale()).toBe('es');
  });

  it('should return current locale label', function() {
    $httpBackend.expectGET(api.getApiUrl(languageApiPath)).respond(localeOptions);

    localeManager.loadLocaleOptions()
      .then(function() {
        localeManager.setCurrentLocale('es');
        expect(localeManager.getCurrentLocaleLabel()).toBe('Español');
      });

    $httpBackend.flush();
  });
});
