module.exports = function(grunt) {
  grunt.registerTask('build-production', [
    'clean:tmp',
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
    'copy:dna',
    'copy:dist',
    'sync:main'
  ]);
};
