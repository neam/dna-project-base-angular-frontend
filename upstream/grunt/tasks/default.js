module.exports = function(grunt) {
  grunt.registerTask('default', [
    'build-development',
    'concurrent:development',
    'serve'
  ]);
};
