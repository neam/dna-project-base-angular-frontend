describe('itemManager', function() {
  var $rootScope,
      $location,
      $http,
      $httpBackend,
      api,
      itemManager,
      urlManager;

  beforeEach(module('Gapminder'));

  beforeEach(inject(function(_$rootScope_, _$location_, _$http_, _$httpBackend_, _api_, _itemManager_, _urlManager_) {
    $rootScope = _$rootScope_;
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

  it('should get an item route param from the URL', function() {
    setLocation('localhost', '', '/ebola');
    expect(itemManager.getItemRouteParamFromUrl()).toBe('/ebola');
  });

  it('should get an item identifier from the URL', function() {
    setLocation('localhost', '', '/exercises/100');
    expect(itemManager.getItemIdentifierFromUrl()).toBe('http://localhost:1338/api/item/100'); // TODO: Is this correct?
  });

  it('should create a user profile URL', function() {
    expect(itemManager.createUserProfileUrl(2)).toBe('http://www.gapminder.org/profiles/2');
  });

  it('should create an item URL for a composition with a defined URL', function() {
    var composition = {
      url: 'http://www.gapminder.org/exercises/100'
    };

    expect(itemManager.createItemUrl(composition)).toBe('http://www.gapminder.org/exercises/100');
  });

  it('should create an item URL for a composition with an undefined URL', function() {
    var composition = {
      node_id: 1092
    };

    expect(itemManager.createItemUrl(composition)).toBe('#/1092');
  });

  it('should navigate to a profile page', function() {
    var userId = 1,
        fakeEvent = {
          preventDefault: function() {
            return true;
          }
        };

    spyOn(urlManager, 'redirect');
    itemManager.goToProfile(userId, fakeEvent);
    expect(urlManager.redirect).toHaveBeenCalled();
  });

  it('should check if an item has contributors', function() {
    var item = {
      contributors: [
        {user_id: 1},
        {user_id: 2}
      ]
    };

    expect(itemManager.itemHasContributors(item)).toBeTruthy();
  });

  it('should check if an item does not have contributors (null)', function() {
    var item = {
      contributors: null
    };

    expect(itemManager.itemHasContributors(item)).toBeFalsy();
  });

  it('should check if an item does not have contributors (empty array)', function() {
    var item = {
      contributors: []
    };

    expect(itemManager.itemHasContributors(item)).toBeFalsy();
  });

  it('should remove an admin user from a contributor array', function() {
    var item = {
        contributors: [
          {
            user_id: 1
          }
        ]
      },
      containsAdmin = false;

    itemManager.removeAdminContributorFromItem(item);

    angular.forEach(item.contributors, function(contributor) {
      if (!containsAdmin && contributor.user_id === 1) {
        containsAdmin = true;
      }
    });

    expect(containsAdmin).toBeFalsy();
  });

  it('should set the meta description tag to item about', function() {
    var description = 'This is an item.',
        item = {
          attributes: {
            about: description
          }
        };

    itemManager.setMetaDescriptionFromItem(item);

    expect($rootScope.metaDescription).toBe(description);
  });

  it('should set the meta description tag to item subheading', function() {
    var description = 'This is an item.',
        item = {
          attributes: {
            subheading: description
          }
        };

    itemManager.setMetaDescriptionFromItem(item);

    expect($rootScope.metaDescription).toBe(description);
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
