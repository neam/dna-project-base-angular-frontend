module.exports = function(grunt) {
  var path = require('path');

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {

      baseApiUrlDevelopment: grunt.option('api') || '',
      baseApiUrlProduction: grunt.option('api') || '',
      baseApiUrlStage: grunt.option('api') || '',
      assetUrlDevelopment: grunt.option('assetUrl') || '',
      assetUrlProduction: grunt.option('assetUrl') || '',
      assetUrlStage: grunt.option('assetUrl') || '',
      html5ModeDevelopment: grunt.option('html5Mode') || false,
      html5ModeProduction: grunt.option('html5Mode') || true,
      html5ModeStage: grunt.option('html5Mode') || false,
      mixpanelIdDevelopment: grunt.option('mixpanelId') || '',
      mixpanelIdProduction: grunt.option('mixpanelId') || '',
      mixpanelIdStage: grunt.option('mixpanelId') || '',
      httpServerDir: './dist'

    }
  });

};
