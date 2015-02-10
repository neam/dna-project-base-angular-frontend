module.exports = function(grunt) {
  var path = require('path');

  var dnaPath = '../angular-frontend-dna';

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    overridePath: path.join(process.cwd(), dnaPath, 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {
      BASE_API_URL_DEVELOPMENT: grunt.option('api') || 'http://localhost:1338/api',
      BASE_API_URL_PRODUCTION: grunt.option('api') || 'http://cms.gapminder.org/api/v1',
      BASE_API_URL_STAGE: grunt.option('api') || 'http://cms.gapminder.org/api/v1',
      DNA_PATH: dnaPath,
      MIXPANEL_PROJECT_TOKEN: grunt.option('mixpanelId') || '',
    }
  });

};
