module.exports = function(grunt) {
  grunt.registerTask('build-development', [
    'clean:tmp',
    'clean:dist',
    'sass:development',
    'concat:development',
    'concat:dna',
    'ngAnnotate:app',
    'bower:main',
    'concat:vendor',
    'template:development',
    'update_json:bower',
    'copy:assetsDevelopment',
    'copy:other',
    'copy:dna',
    'copy:dist',
    'sync:main',
    //'karma:unit'
  ]);
};
