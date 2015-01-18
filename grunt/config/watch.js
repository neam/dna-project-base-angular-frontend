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
