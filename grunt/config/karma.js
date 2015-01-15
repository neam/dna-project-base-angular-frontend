module.exports = {
  unit: {
    configFile: 'karma.conf.js',
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: '<%= paths.dist %>/coverage',
      reporters: [
        {
          type: 'html',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    }
  }
};
