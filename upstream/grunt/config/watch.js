module.exports = {
  sass: {
    files: ['<%= paths.sass %>/**/*.{scss,sass,css}'],
    tasks: [
      'sass:development',
      'sync:main'
    ]
  },
  js: {
    files: [
      '<%= paths.js %>/**/*.js'
    ],
    tasks: [
      'concat:development',
      'copy:assetsDevelopment',
      'sync:main',
      //'karma:unit'
    ]
  },
  /*tests: {
    files: ['<%= paths.tests %>/** /*.js'],
    tasks: ['karma:unit']
  },*/
  templates: {
    files: [
      '<%= paths.src %>/templates/**'
    ],
    tasks: [
      'copy:templates',
      'sync:main'
    ]
  },
  other: {
    files: [
      '<%= paths.src %>/index.html',
      '<%= paths.src %>/fonts/**',
      '<%= paths.src %>/images/**',
      '<%= paths.src %>/templates/**',
      '<%= paths.vendor %>/**'
    ],
    tasks: [
      'template:development',
      'copy:other',
      'sync:main'
    ]
  },
  inspinia: {
    files: [
      '<%= paths.src %>/404.html',
      '<%= paths.src %>/500.html',
      '<%= paths.src %>/fonts/**',
      '<%= paths.src %>/img/**',
      '<%= paths.src %>/font-awesome/**',
      '<%= paths.src %>/email_templates/**',
      '<%= paths.src %>/img/**',
      '<%= paths.src %>/views/**'
    ],
    tasks: [
      'template:development',
      'copy:other',
      'sync:main'
    ]
  },
  userapp: {
    files: [
      '<%= paths.src %>/partials/**'
    ],
    tasks: [
      'template:development',
      'copy:other',
      'sync:main'
    ]
  },
  packageJson: {
    files: [
      '<%= paths.root %>/package.json'
    ],
    tasks: [
      'update_json:bower',
      'build-development'
    ]
  }
};
