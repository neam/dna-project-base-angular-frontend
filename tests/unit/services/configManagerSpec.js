describe('configManager', function() {
  var configManager;

  beforeEach(module('Gapminder'));

  beforeEach(inject(function(_configManager_) {
    configManager = _configManager_;
  }));

  it('should get a default config value', function() {
    expect(configManager.get('authClientId')).toBe('TestClient');
  });

  it('should get an environment-specific (overridden) config value', function() {
    expect(configManager.get('environment')).toBe('development');
  });
});
