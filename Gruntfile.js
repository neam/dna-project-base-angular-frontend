'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist',
        dna: '../angular-frontend-dna/app',
        tmp: '.tmp',
        tmpCompile: '.tmp/compile',
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        paths: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app),
                            connect.static(appConfig.dna)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= paths.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    ".tmp/styles/style.css": "<%= paths.tmpCompile %>/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            less: {
                files: ['<%= paths.app %>/less/*.less'],
                tasks: ['copy:less', 'less'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            lessDna: {
                files: ['<%= paths.dna %>/less/*.less'],
                tasks: ['copy:lessDna', 'less'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= paths.app %>/scripts/{,*/}*.js','<%= paths.dna %>/{,*/}{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= paths.app %>/**/*.html','<%= paths.dna %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= paths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // Annotate angular source code with string-injection based syntax to be able to use uglify properly below
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: {
                    '<%= paths.dist %>/assets/scripts/scripts.js': ['<%= paths.dist %>/assets/scripts/scripts.js']
                }
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: true
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= paths.dist %>/{,*/}*',
                        '!<%= paths.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        copy: {
            // Merges files from the dna folder to the main app
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
                        dest: '.tmp/'
                    }
                ]
            },
            // Copies main app less styles to temporary compile directory
            less: {
                files: [
                    {
                        cwd: '<%= paths.app %>/less/',
                        expand: true,
                        filter: 'isFile',
                        src: [
                            '**',
                            '!.gitkeep'
                        ],
                        dest: '<%= paths.tmpCompile %>/less/'
                    }
                ]
            },
            // Copies dna less styles to temporary compile directory
            lessDna: {
                files: [
                    {
                        cwd: '<%= paths.dna %>/less/',
                        expand: true,
                        filter: 'isFile',
                        src: [
                            '**',
                            '!.gitkeep'
                        ],
                        dest: '<%= paths.tmpCompile %>/less/'
                    }
                ]
            },
            // Copies remaining files to places other tasks can use
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= paths.app %>',
                        dest: '<%= paths.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= paths.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= paths.dist %>'
                    },
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= paths.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            stylesDna: {
                expand: true,
                cwd: '<%= paths.dna %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= paths.dist %>/scripts/{,*/}*.js',
                    '<%= paths.dist %>/styles/{,*/}*.css',
                    '<%= paths.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= paths.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: '<%= paths.dna %>/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:server',
        'copy:less',
        'copy:lessDna',
        'less',
        'copy:styles',
        'copy:stylesDna',
        'connect:livereload',
        'watch'
    ]);

    // Run build version of app
    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'copy:dna',
        'copy:less',
        'copy:lessDna',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'ngAnnotate:app',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

};
