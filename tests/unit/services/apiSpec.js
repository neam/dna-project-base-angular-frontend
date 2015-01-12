describe('api', function() {
  var api;

  beforeEach(module('Gapminder'));

  beforeEach(inject(function(_api_) {
    api = _api_;
  }));

  it('should return an API URL', function() {
    expect(api.getApiUrl('/item/ejercicio-con-video')).toBe('http://localhost:1338/api/item/ejercicio-con-video');
  });

  it('should return an API URL even without a leading slash', function() {
    expect(api.getApiUrl('item/ejercicio-con-video')).toBe('http://localhost:1338/api/item/ejercicio-con-video');
  });

  it('should return a configured composition item path name', function() {
    expect(api.getCompositionItemPathName('exercise')).toBe('exercises');
  });

  it('should return a default composition item path name when not configured', function() {
    expect(api.getCompositionItemPathName('doc')).toBe('doc');
  });

  it('should serialize JSON form data', function() {
    var json = {
      username: 'john@example.com',
      password: 'htimsnhoj',
      client_id: 'TestClient',
      grant_type: 'password'
    };

    expect(api.serializeFormData(json)).toBe('username=john%40example.com&password=htimsnhoj&client_id=TestClient&grant_type=password');
  });
});
