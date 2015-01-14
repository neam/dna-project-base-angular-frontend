module.exports = function(grunt) {
  var path = require('path');

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {
      baseApiUrlDevelopment: grunt.option('api') || 'http://localhost:1338/api',
      baseApiUrlProduction: grunt.option('api') || 'http://cms.gapminder.org/api/v1',
      baseApiUrlStage: grunt.option('api') || 'http://cms.gapminder.org/api/v1',
      assetUrlDevelopment: grunt.option('assetUrl') || '',
      assetUrlProduction: grunt.option('assetUrl') || 'http://static.gapminder.org/pages-desktop/master/',
      assetUrlStage: grunt.option('assetUrl') || 'http://static.gapminder.org/pages-desktop-stage/',
      html5ModeDevelopment: grunt.option('html5Mode') || false,
      html5ModeProduction: grunt.option('html5Mode') || true,
      html5ModeStage: grunt.option('html5Mode') || false,
      httpServerDir: './dist'
    }
  });
};
