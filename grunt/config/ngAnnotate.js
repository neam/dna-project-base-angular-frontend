module.exports = {
  options: {
    singleQuotes: true
  },
  app: {
    files: {
      '<%= paths.tmpCompile %>/assets/js/main.js': ['<%= paths.tmpCompile %>/assets/js/main.js']
    }
  }
};
