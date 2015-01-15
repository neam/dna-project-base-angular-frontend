module.exports = {
  development: {
    options: {
      style: 'expanded',
      compass: true
    },
    files: {
      '<%= paths.tmpDist %>/assets/css/main.css': '<%= paths.sass %>/main.sass'
    }
  },
  production: {
    options: {
      style: 'compressed',
      compass: true
    },
    files: {
      '<%= paths.tmpDist %>/assets/css/main.css': '<%= paths.sass %>/main.sass'
    }
  }
};
