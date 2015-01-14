module.exports = function(grunt) {
  grunt.registerTask('build-stage', [
    'clean:dist',
    'sass:production',
    'concat:stage',
    'ngAnnotate:app',
    'bower:main',
    'concat:vendor',
    'uglify:production',
    'template:stage',
    'update_json:bower',
    'copy:assetsProduction',
    'copy:other',
    'copy:dist',
    'sync:main'
  ]);
};