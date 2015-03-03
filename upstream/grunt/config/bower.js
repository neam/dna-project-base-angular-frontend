module.exports = {
  main: {
    dest: '<%= paths.tmpDist %>/vendor/',
    js_dest: '<%= paths.tmpCompile %>/vendor/js',
    scss_dest: '<%= paths.tmpCompile %>/vendor/scss',
    css_dest: '<%= paths.tmpCompile %>/vendor/css',
    eot_dest: '<%= paths.tmpDist %>/vendor/fonts',
    ttf_dest: '<%= paths.tmpDist %>/vendor/fonts',
    woff_dest: '<%= paths.tmpDist %>/vendor/fonts',
    options: {
      stripAffix: true,
      packageSpecific: {
        'bootstrap-sass-official': {
          svg_dest: '<%= paths.tmpDist %>/vendor/fonts'
        },
        'font-awesome': {
          // TODO: Copy FontAwesome.otf and fontawesome-webfont.svg into the correct directory.
          otf_dest: '<%= paths.tmpDist %>/vendor/fonts/fonts',
          svg_dest: '<%= paths.tmpDist %>/vendor/fonts/fonts'
        }
      },
      ignorePackages: ['underscore']
    }
  }
};
