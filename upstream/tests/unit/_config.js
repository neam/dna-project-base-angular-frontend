// Environment configurations (must be loaded in karma.conf.js files)

angular.module('Gapminder')
  .constant('BASE_API_URL', 'http://localhost:1338/api')
  .constant('ASSET_URL', '')
  .constant('CANONICAL_BASE_URL', 'http://localhost:1335')
  .constant('MOBILE_BASE_URL', 'http://localhost:1336')
  .constant('HTML5_MODE', false)
  .constant('TESTING', true)
  .constant('VERSION', '1.0.0')
  .constant('BUILD_HASH', '7d7c2f59a687628bafe49b38ca55e10311108833');
