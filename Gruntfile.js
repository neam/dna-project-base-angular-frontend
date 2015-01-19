module.exports = function(grunt) {
  var path = require('path');

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {
      BASE_API_URL_DEVELOPMENT: grunt.option('api') || 'http://localhost:1338/api',
      BASE_API_URL_PRODUCTION: grunt.option('api') || 'http://cms.gapminder.org/api/v1',
      BASE_API_URL_STAGE: grunt.option('api') || 'http://cms.gapminder.org/api/v1',
      MIXPANEL_ID_DEVELOPMENT: grunt.option('mixpanelId') || '',
      MIXPANEL_ID_PRODUCTION: grunt.option('mixpanelId') || '',
      MIXPANEL_ID_STAGE: grunt.option('mixpanelId') || ''
    }
  });

};
