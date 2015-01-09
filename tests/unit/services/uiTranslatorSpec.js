describe('uiTranslator', function() {
  var $rootScope,
    $controller,
    $httpBackend,
    $q,
    api,
    localeManager,
    uiTranslator,
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

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$q_, _api_, _localeManager_, _uiTranslator_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    api = _api_;
    localeManager = _localeManager_;
    uiTranslator = _uiTranslator_;

    localeManager.setCurrentLocale(locale);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initialize service', function() {
    $httpBackend.expectGET(api.getApiUrl(apiUrl)).respond(translations);

    uiTranslator.init()
      .then(function() {
        expect(uiTranslator.isReady).toBe(true);
      });

    $httpBackend.flush();
  });

  it('should translate a string', function() {
    $httpBackend.expectGET(api.getApiUrl(apiUrl)).respond(translations);

    uiTranslator.init().then(function() {
      var translation = uiTranslator.translate('test:login');
      expect(translation).toBe('Kirjaudu');
    });

    $httpBackend.flush();
  });

  it('should translate a plural phrase', function() {
    $httpBackend.expectGET(api.getApiUrl(apiUrl)).respond(translations);

    uiTranslator.init().then(function() {
      var translation = uiTranslator.translate('test:user', {count: 3});
      expect(translation).toBe('3 käyttäjää');
    });

    $httpBackend.flush();
  });

  it('should translate a string and replace a variable', function() {
    $httpBackend.expectGET(api.getApiUrl(apiUrl)).respond(translations);

    uiTranslator.init().then(function() {
      var translation = uiTranslator.translate('test:you-are', {username: 'Eric'});
      expect(translation).toBe('Sinä olet Eric');
    });

    $httpBackend.flush();
  });
});
