describe('itemManager', function() {
  var $location,
      $http,
      $httpBackend,
      api,
      itemManager,
      urlManager;

  beforeEach(module('Gapminder'));

  beforeEach(inject(function(_$location_, _$http_, _$httpBackend_, _api_, _itemManager_, _urlManager_) {
    $location = _$location_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    api = _api_;
    itemManager = _itemManager_;
    urlManager = _urlManager_;

    // Expect templates and default requests
    $httpBackend.whenGET(/templates.*/).respond(200, '');
    $httpBackend.whenGET(/translateui*/).respond(200, '');

    resetLocation();
  }));

  it('should load items by a defined route', function() {
    var itemRoute = '/exercises/1291';

    setLocation('localhost', '', itemRoute);

    $httpBackend.expectGET(itemManager.getItemIdentifierFromUrl()).respond(200, {foo: 'bar'});

    itemManager.loadItem()
      .success(function(item) {
        expect(item.foo).toBe('bar');
      });

    $httpBackend.flush();
  });

  it('should load items by an undefined (wildcard) route', function() {
    var itemRoute = '/ebola';

    setLocation('localhost', '', itemRoute);
    $httpBackend.expectGET(itemManager.getItemIdentifierFromUrl()).respond(200, {foo: 'bar'});

    itemManager.loadItem()
      .success(function(item) {
        expect(item.foo).toBe('bar');
      });

    $httpBackend.flush();
  });

  it('should handle a 404 rejection', function() {
    var itemRoute = '/not/found',
        errorMsg = 'Not found.';

    setLocation('localhost', '', itemRoute);
    $httpBackend.expectGET(itemManager.getItemIdentifierFromUrl()).respond(404, {message: errorMsg});

    itemManager.loadItem()
      .error(function(err) {
        expect(err.message).toBe(errorMsg);
      });

    $httpBackend.flush();
  });

  it('should return a page API URL with a URL-encoded route (one level)', function() {
    expect(itemManager.getPageApiUrl('/ebola')).toBe('http://localhost:1338/api/item/%2Febola');
  });

  it('should return a page API URL with a URL-encoded route (two levels)', function() {
    expect(itemManager.getPageApiUrl('/ebola/dashboard')).toBe('http://localhost:1338/api/item/%2Febola%2Fdashboard');
  });

  it('should return a page API URL with a node ID (type number)', function() {
    expect(itemManager.getPageApiUrl(100)).toBe('http://localhost:1338/api/item/100');
  });

  it('should return a page API URL with a node ID (type string)', function() {
    expect(itemManager.getPageApiUrl('100')).toBe('http://localhost:1338/api/item/100');
  });

  /**
   * Overrides $location.
   * @param {string} host
   * @param {string} subdir
   * @param {string} route
   * @param {boolean} [useHashbang] whether to include a hashbang (defaults to false).
   */
  function setLocation(host, subdir, route, useHashbang) {
    var useHashbang = angular.isDefined(useHashbang) ? useHashbang : false,
      subdir = subdir.length > 0 ? '/' + subdir : '',
      hashbang = useHashbang ? '/#' : '';

    $location.$$host = host;
    $location.$$path = route;
    $location.$$url = route;
    $location.$$absUrl = 'http://' + host + subdir + hashbang + route;
  }

  /**
   * Resets $location.
   */
  function resetLocation() {
    $location.$$host = 'server';
    $location.$$path = '';
    $location.$$url = '';
    $location.$$absUrl = 'http://server/';
  }
});
