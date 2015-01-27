module.exports = {
  options: {
    separator: "\n"
  },
  development: {
    src: [
      '<%= paths.js %>/modules/**/*.js',
      '<%= paths.js %>/app.js',
      '<%= paths.js %>/base/**/*.js',
      '<%= paths.js %>/config/environments/development.js',
      '<%= paths.js %>/config/interceptors.js',
      '<%= paths.js %>/config/local.js',
      '<%= paths.js %>/config/main.js',
      '<%= paths.js %>/config/states.js',
      '<%= paths.js %>/controllers/**/*.js',
      '<%= paths.js %>/directives/**/*.js',
      '<%= paths.js %>/filters/**/*.js',
      '<%= paths.js %>/helpers/**/*.js',
      '<%= paths.js %>/resources/**/*.js',
      '<%= paths.js %>/services/**/*.js',
      '<%= paths.js %>/interceptors/**/*.js'
    ],
    dest: '<%= paths.tmpCompile %>/assets/js/main.js'
  },
  production: {
    src: [
      '<%= paths.js %>/modules/**/*.js',
      '<%= paths.js %>/app.js',
      '<%= paths.js %>/base/**/*.js',
      '<%= paths.js %>/config/environments/production.js',
      '<%= paths.js %>/config/interceptors.js',
      '<%= paths.js %>/config/local.js',
      '<%= paths.js %>/config/main.js',
      '<%= paths.js %>/config/states.js',
      '<%= paths.js %>/controllers/**/*.js',
      '<%= paths.js %>/directives/**/*.js',
      '<%= paths.js %>/filters/**/*.js',
      '<%= paths.js %>/helpers/**/*.js',
      '<%= paths.js %>/resources/**/*.js',
      '<%= paths.js %>/services/**/*.js',
      '<%= paths.js %>/interceptors/**/*.js'
    ],
    dest: '<%= paths.tmpCompile %>/assets/js/main.js'
  },
  stage: {
    src: [
      '<%= paths.js %>/modules/**/*.js',
      '<%= paths.js %>/app.js',
      '<%= paths.js %>/base/**/*.js',
      '<%= paths.js %>/config/environments/stage.js',
      '<%= paths.js %>/config/interceptors.js',
      '<%= paths.js %>/config/local.js',
      '<%= paths.js %>/config/main.js',
      '<%= paths.js %>/config/states.js',
      '<%= paths.js %>/controllers/**/*.js',
      '<%= paths.js %>/directives/**/*.js',
      '<%= paths.js %>/filters/**/*.js',
      '<%= paths.js %>/helpers/**/*.js',
      '<%= paths.js %>/resources/**/*.js',
      '<%= paths.js %>/services/**/*.js',
      '<%= paths.js %>/interceptors/**/*.js'
    ],
    dest: '<%= paths.tmpCompile %>/assets/js/main.js'
  },
  vendor: {
    src: [
      '<%= paths.vendor %>/angular-google-chart/ng-google-chart.js',
      '<%= paths.vendor %>/angulartics/dist/angulartics.min.js',
      '<%= paths.vendor %>/angulartics/dist/angulartics-scroll.min.js',
      '<%= paths.vendor %>/angulartics/dist/angulartics-ga.min.js',
      '<%= paths.vendor %>/angulartics/dist/angulartics-mixpanel.min.js'
      /*
      '<%= paths.vendor %>/jquery/dist/jquery.js',
      '<%= paths.vendor %>/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
      '<%= paths.vendor %>/lodash/dist/lodash.js',
      '<%= paths.tmpCompile %>/vendor/js/angular.js',
      '<%= paths.tmpCompile %>/vendor/js/** /*.js'
      */
    ],
    dest: '<%= paths.tmpDist %>/assets/js/vendor.js'
  }
};
