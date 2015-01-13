describe('deviceRedirector', function() {
  var $location,
      $window,
      deviceRedirector,
      urlManager,
      SESSION_STORAGE_KEY = 'cancelDeviceRedirect';

  beforeEach(module('Gapminder', function($provide) {
    var fakeWindow = {
      location: {
        href: null
      },
      localStorage: window.localStorage,
      sessionStorage: window.sessionStorage,
      device: window.device,
      navigator: window.navigator
    };

    $provide.value('$window', fakeWindow);
  }));

  beforeEach(inject(function(_$location_, _$window_, _deviceRedirector_, _urlManager_) {
    $location = _$location_;
    $window = _$window_;
    deviceRedirector = _deviceRedirector_;
    urlManager = _urlManager_;
  }));

  it('should save query param and cancel redirects', function() {
    spyOn(deviceRedirector, 'cancelRedirects').and.returnValue(true);
    spyOn($location, 'search').and.returnValue({
      disableRedirect: true
    });
    deviceRedirector.saveQueryParam();
    expect(deviceRedirector.cancelRedirects).toHaveBeenCalled();
  });

  it('should save query param and uncancel redirects', function() {
    spyOn(deviceRedirector, 'uncancelRedirects').and.returnValue(true);
    spyOn($location, 'search').and.returnValue({
      enableRedirect: true
    });
    deviceRedirector.saveQueryParam();
    expect(deviceRedirector.uncancelRedirects).toHaveBeenCalled();
  });

  it('should cancel redirects', function() {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    deviceRedirector.cancelRedirects();
    expect(window.sessionStorage.getItem(SESSION_STORAGE_KEY)).toBeTruthy();
  });

  it('should uncancel redirects', function() {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    deviceRedirector.uncancelRedirects();
    expect(window.sessionStorage.getItem(SESSION_STORAGE_KEY)).toBeFalsy();
  });

  it('should make sure redirects are disabled', function() {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, true);
    expect(deviceRedirector.isRedirectDisabled()).toBeTruthy();
  });

  it('should make sure redirects are disabled', function() {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    //expect(deviceRedirector.isRedirectDisabled()).toBeFalsy(); // TODO: Uncomment when device redirects have been released.
  });

  it('should perform a redirect', function() {
    spyOn(device, 'mobile').and.returnValue(true);
    spyOn(deviceRedirector, 'isRedirectDisabled').and.returnValue(false);

    setLocation('localhost', '/foo');
    deviceRedirector.redirect();

    expect($window.location.href).toBe(urlManager.getMobileUrl());
  });

  it('should force a redirect', function() {
    setLocation('localhost', '/foo');
    deviceRedirector.forceRedirect();
    expect($window.location.href).toBe(urlManager.getMobileUrl() + '?disableRedirect');
  });

  /**
   * Overrides $location.
   * @param {string} host
   * @param {string} route
   */
  function setLocation(host, route) {
    $location.$$host = host;
    $location.$$path = route;
    $location.$$url = route;
    $location.$$absUrl = 'http://' + host + route;
  }
});
