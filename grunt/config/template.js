var crypto = require('crypto'),
    currentDate = (new Date()).valueOf().toString(),
    random = Math.random().toString(),
    buildHash = crypto.createHash('sha1').update(currentDate + random).digest('hex');

module.exports = {
  development: {
    options: {
      data: {
        BASE_API_URL: '<%= BASE_API_URL_DEVELOPMENT %>',
        ASSET_URL: '',
        CANONICAL_BASE_URL: 'http://localhost:1335',
        MOBILE_BASE_URL: 'http://localhost:1336',
        HTML5_MODE: false,
        MIXPANEL_ID: '<%= MIXPANEL_ID_DEVELOPMENT %>',
        VERSION: '<%= package.version %>',
        BUILD_HASH: buildHash
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  },
  production: {
    options: {
      data: {
        BASE_API_URL: '<%= BASE_API_URL_PRODUCTION %>',
        ASSET_URL: 'http://static.gapminder.org/pages-desktop/master/',
        CANONICAL_BASE_URL: 'http://www.gapminder.org',
        MOBILE_BASE_URL: 'http://m.gapminder.org',
        HTML5_MODE: true,
        MIXPANEL_ID: '<%= MIXPANEL_ID_PRODUCTION %>',
        VERSION: '<%= package.version %>',
        BUILD_HASH: buildHash
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  },
  stage: {
    options: {
      data: {
        BASE_API_URL: '<%= BASE_API_URL_STAGE %>',
        ASSET_URL: 'http://static.gapminder.org/pages-desktop-stage/',
        CANONICAL_BASE_URL: 'http://static.gapminder.org/pages-desktop-stage',
        MOBILE_BASE_URL: 'http://static.gapminder.org/pages-mobile-stage',
        HTML5_MODE: false,
        MIXPANEL_ID: '<%= MIXPANEL_ID_STAGE %>',
        VERSION: '<%= package.version %>',
        BUILD_HASH: buildHash
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  }
};
