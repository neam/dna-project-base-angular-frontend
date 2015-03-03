module.exports = {
  production: {
    options: {
      mangle: false
    },
    files: {
      '<%= paths.tmpDist %>/assets/js/main.js': ['<%= paths.tmpCompile %>/assets/js/main.js'],
      '<%= paths.tmpDist %>/assets/js/vendor.js': ['<%= paths.tmpDist %>/assets/js/vendor.js']
    }
  }
};
