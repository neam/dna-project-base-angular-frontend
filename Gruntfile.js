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
                            connect.static(appConfig.dna),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    livereload: false,
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
                    '<%= paths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}','<%= paths.dna %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
                    '.tmp/concat/scripts/vendor.js': ['.tmp/concat/scripts/vendor.js'],
                    '.tmp/concat/scripts/scripts.js': ['.tmp/concat/scripts/scripts.js']
                }
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        // Note: Taken care of by ngAnnotate above
        uglify: {
            options: {
                mangle: false,
                sourceMap: true
            }
        },
        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.merged-app',
                        '<%= paths.dist %>/{,*/}*',
                        '!<%= paths.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        copy: {
            // Merges files from the dna and bower_components folder to the a merged app folder, similar to the one served during dev
            preBuildMerge: {
                files: [
                    {
                        cwd: '<%= paths.app %>/',
                        expand: true,
                        filter: 'isFile',
                        src: [
                            '**',
                            '!.gitkeep'
                        ],
                        dest: '.merged-app/'
                    },
                    {
                        cwd: '<%= paths.dna %>/',
                        expand: true,
                        filter: 'isFile',
                        src: [
                            '**',
                            '!.gitkeep'
                        ],
                        dest: '.merged-app/'
                    },
                    {
                        cwd: 'bower_components/',
                        expand: true,
                        filter: 'isFile',
                        src: [
                            '**',
                            '!.gitkeep'
                        ],
                        dest: '.merged-app/bower_components'
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
                        cwd: '.merged-app/',
                        dest: '<%= paths.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '{,*/}{,*/}{,*/}{,*/}*.html',
                            'styles/patterns/*.*',
                            'scripts/env.js',
                            'images/{,*/}*.*'
                        ]
                    },
                    {
                        // To be able to debug using source maps
                        expand: true,
                        dot: true,
                        cwd: '.tmp',
                        dest: '<%= paths.dist %>/.tmp',
                        src: [
                            '**'
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
                    src: ['*.html', '{,*/}{,*/}*.html'],
                    dest: '<%= paths.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: '.merged-app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    grunt.registerTask('dumpConfig', 'Dump grunt config', function(arg) {
      grunt.log.writeln(JSON.stringify(grunt.config(), null, 2));
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
        'copy:less',
        'copy:lessDna',
        'less',
        'copy:styles',
        'copy:stylesDna',
        'copy:preBuildMerge',
        'useminPrepare',
        'dumpConfig',
        'concat',
        'copy:dist',
        'cssmin',
        'ngAnnotate:dist',
        'uglify',
        //'filerev', // awaiting merge of https://github.com/yeoman/grunt-filerev/pull/67
        'usemin',
        'htmlmin'
    ]);

};
