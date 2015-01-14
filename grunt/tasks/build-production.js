module.exports = function(grunt) {
  grunt.registerTask('build-production', [
    'clean:dist',
    'sass:production',
    'concat:production',
    'ngAnnotate:app',
    'bower:main',
    'concat:vendor',
    'uglify:production',
    'template:production',
    'update_json:bower',
    'copy:assetsProduction',
    'copy:other',
    'copy:dist',
    'sync:main'
  ]);
};
