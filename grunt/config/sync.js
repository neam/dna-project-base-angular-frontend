module.exports = {
  main: {
    files: [
      {
        cwd: '<%= paths.tmpDist %>',
        src: ['**'],
        dest: '<%= paths.dist %>'
      }
    ],
    verbose: true
  }
};
