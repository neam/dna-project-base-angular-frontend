describe('utils', function() {
  var utils;

  beforeEach(module('Gapminder'));

  beforeEach(inject(function(_utils_) {
    utils = _utils_;
  }));

  it('should strip a leading slash', function() {
    var str = '/path/with/leading/slash';
    str = utils.stripLeadingSlash(str);
    expect(str).toBe('path/with/leading/slash');
  });

  it('should try to strip a leading slash from a number', function() {
    var str = 100;
    str = utils.stripLeadingSlash(str);
    expect(str).toBe('100');
  });

  it('should strip a trailing slash', function() {
    var str = '/path/with/trailing/slash/';
    str = utils.stripTrailingSlash(str);
    expect(str).toBe('/path/with/trailing/slash');
  });

  it('should strip a trailing slash from a number', function() {
    var str = 100;
    str = utils.stripTrailingSlash(str);
    expect(str).toBe('100');
  });

  it('should ensure a leading slash', function() {
    var str = 'path/without/leading/slash/';
    str = utils.ensureLeadingSlash(str);
    expect(str).toBe('/path/without/leading/slash/');
  });

  it('should ensure a trailing slash', function() {
    var str = '/path/without/trailing/slash';
    str = utils.ensureTrailingSlash(str);
    expect(str).toBe('/path/without/trailing/slash/');
  });

  it('should ensure a trailing slash on a number', function() {
    var str = 100;
    str = utils.ensureTrailingSlash(str);
    expect(str).toBe('100/');
  });
});
