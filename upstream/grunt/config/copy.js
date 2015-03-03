module.exports = {
  dist: {
    files: [
      {
        cwd: '<%= paths.tmpDist %>/',
        expand: true,
        filter: 'isFile',
        src: [
          '**',
          '!.gitkeep'
        ],
        dest: '<%= paths.dist %>/'
      }
    ]
  },
  assetsDevelopment: {
    files: [
      {
        // JavaScript
        cwd: '<%= paths.tmpCompile %>/assets/js/',
        expand: true,
        filter: 'isFile',
        src: ['**/*.js'],
        dest: '<%= paths.tmpDist %>/assets/js/'
      },
      {
        // Root
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['favicon.ico'],
        dest: '<%= paths.tmpDist %>/'
      }
    ]
  },
  assetsProduction: {
    files: [
      {
        // Root
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['favicon.ico'],
        dest: '<%= paths.tmpDist %>/'
      }
    ]
  },
  templates: {
    files: [
      {
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['templates/**/**.html'],
        dest: '<%= paths.tmpDist %>/'
      }
    ]
  },
  other: {
    files: [
      {
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['images/**', 'templates/**'],
        dest: '<%= paths.tmpDist %>/'
      },
      {
        // tmp inspinia-init
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['js/**', 'css/**', 'fonts/**', 'templates/**', 'font-awesome/**', 'email_templates/**', 'img/**', 'views/**',
            '404.html',
            '500.html',
            'lockscreen.html',
            'login.html',
            'register.html'
        ],
        dest: '<%= paths.tmpDist %>/'
      },
      {
        // tmp userapp-init
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['lib/**', 'partials/**'],
        dest: '<%= paths.tmpDist %>/'
      },
      {
        // Fonts
        cwd: '<%= paths.src %>/',
        expand: true,
        filter: 'isFile',
        src: ['fonts/**'],
        dest: '<%= paths.tmpDist %>/assets/'
      },
      {
        // mediaelementplayer
        cwd: '<%= paths.vendor %>/',
        expand: true,
        filter: 'isFile',
        src: [
          'mediaelement/build/*.svg',
          'mediaelement/build/*.png',
          'mediaelement/build/*.gif',
          'mediaelement/build/*.swf'
        ],
        dest: '<%= paths.tmpDist %>/vendor'
      }
    ]
  },
  dna: {
    files: [
      {
        cwd: '<%= paths.dna %>/',
        expand: true,
        filter: 'isFile',
        src: [
          '**',
          '!.gitkeep'
        ],
        dest: '<%= paths.tmpDist %>/'
      }
    ]
  }
};