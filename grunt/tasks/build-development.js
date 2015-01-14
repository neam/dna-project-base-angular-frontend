module.exports = function(grunt) {
  grunt.registerTask('build-development', [
    'clean:dist',
    'sass:development',
    'concat:development',
    'ngAnnotate:app',
    'bower:main',
    'concat:vendor',
    'template:development',
    'update_json:bower',
    'copy:assetsDevelopment',
    'copy:other',
    'copy:dist',
    'sync:main',
    'karma:unit'
  ]);
};
