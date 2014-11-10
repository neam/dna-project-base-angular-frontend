module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    var baseApiUrlDevelopment = grunt.option('api') || 'http://localhost:1338/api',
        baseApiUrlProduction = grunt.option('api') || 'http://release_pages-dec-1-2014-cms.gapminder.org/api/v1',
        baseApiUrlStage = grunt.option('api') || 'http://cmsext.gapminderdev.org:1338/api',
        html5ModeDevelopment = grunt.option('html5Mode') || false,
        html5ModeProduction = grunt.option('html5Mode') || true,
        html5ModeStage = grunt.option('html5Mode') || false;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            js: 'src/js',
            sass: 'src/sass',
            src: 'src',
            dist: 'dist',
            distAssets: 'dist/assets',
            vendor: 'vendor',
            tmp: '.tmp',
            tmpCompile: '.tmp/compile',
            tmpDist: '.tmp/dist'
        },
        concat: {
            options: {
                separator: "\n\n"
            },
            development: {
                src: [
                    '<%= paths.js %>/app.js',
                    '<%= paths.js %>/base/**/*.js',
                    '<%= paths.js %>/config/environments/development.js',
                    '<%= paths.js %>/config/interceptors.js',
                    '<%= paths.js %>/config/local.js',
                    '<%= paths.js %>/config/main.js',
                    '<%= paths.js %>/config/routes.js',
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
                    '<%= paths.js %>/app.js',
                    '<%= paths.js %>/base/**/*.js',
                    '<%= paths.js %>/config/environments/production.js',
                    '<%= paths.js %>/config/interceptors.js',
                    '<%= paths.js %>/config/local.js',
                    '<%= paths.js %>/config/main.js',
                    '<%= paths.js %>/config/routes.js',
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
                    '<%= paths.js %>/app.js',
                    '<%= paths.js %>/base/**/*.js',
                    '<%= paths.js %>/config/environments/stage.js',
                    '<%= paths.js %>/config/interceptors.js',
                    '<%= paths.js %>/config/local.js',
                    '<%= paths.js %>/config/main.js',
                    '<%= paths.js %>/config/routes.js',
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
                    '<%= paths.vendor %>/jquery/dist/jquery.js',
                    '<%= paths.vendor %>/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
                    '<%= paths.vendor %>/lodash/dist/lodash.js',
                    '<%= paths.tmpCompile %>/vendor/js/angular.js',
                    '<%= paths.tmpCompile %>/vendor/js/**/*.js'
                ],
                dest: '<%= paths.tmpDist %>/assets/js/vendor.js'
            }
        },
        bower: {
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
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    '<%= paths.tmpDist %>/assets/js/main.js': ['<%= paths.tmpCompile %>/assets/js/main.js'],
                    '<%= paths.tmpDist %>/assets/js/vendor.js': ['<%= paths.tmpDist %>/assets/js/vendor.js']
                }
            }
        },
        sass: {
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
        },
        template: {
            development: {
                options: {
                    data: {
                        environment: 'development',
                        baseApiUrl: baseApiUrlDevelopment,
                        html5Mode: html5ModeDevelopment
                    }
                },
                files: {
                    '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
                }
            },
            production: {
                options: {
                    data: {
                        environment: 'production',
                        baseApiUrl: baseApiUrlProduction,
                        html5Mode: html5ModeProduction
                    }
                },
                files: {
                    '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
                }
            },
            stage: {
                options: {
                    data: {
                        environment: 'stage',
                        baseApiUrl: baseApiUrlStage,
                        html5Mode: html5ModeStage
                    }
                },
                files: {
                    '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
                }
            }
        },
        copy: {
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
                        // Fonts
                        cwd: '<%= paths.src %>/',
                        expand: true,
                        filter: 'isFile',
                        src: ['fonts/**'],
                        dest: '<%= paths.tmpDist %>/assets/'
                    }
                ]
            }
        },
        sync: {
            main: {
                files: [
                    {
                        cwd: '<%= paths.tmpDist %>',
                        src: ['**'],
                        dest: '<%= paths.dist %>'
                    }
                ],
                verbose: true
            }
        },
        clean: {
            dist: [
                '<%= paths.dist %>'
            ],
            tmp: [
                '<%= paths.tmp %>'
            ]
        },
        watch: {
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
                    'sync:main'
                ]
            },
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
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            development: ['watch', 'serve']
        },
        'http-server': {
            development: {
                root: './dist',
                port: 1337,
                host: '127.0.0.1',
                cache: 1,
                showDir : true,
                autoIndex: true,
                ext: 'html',
                runInBackground: false
            }
        }
    });

    // Builds the app for development
    grunt.registerTask('build-development', [
        'clean:dist',
        'sass:development',
        'concat:development',
        'bower:main',
        'concat:vendor',
        'template:development',
        'copy:assetsDevelopment',
        'copy:other',
        'copy:dist',
        'sync:main'
    ]);

    // Builds the app for production
    grunt.registerTask('build-production', [
        'clean:dist',
        'sass:production',
        'concat:production',
        'bower:main',
        'concat:vendor',
        'uglify:production',
        'template:production',
        'copy:assetsProduction',
        'copy:other',
        'copy:dist',
        'sync:main'
    ]);

    // Builds the app for stage
    grunt.registerTask('build-stage', [
        'clean:dist',
        'sass:production',
        'concat:stage',
        'bower:main',
        'concat:vendor',
        'uglify:production',
        'template:stage',
        'copy:assetsProduction',
        'copy:other',
        'copy:dist',
        'sync:main'
    ]);

    // Runs the HTTP server
    grunt.registerTask('serve', [
        'http-server:development'
    ]);

    // Default task
    grunt.registerTask('default', [
        'build-development',
        'concurrent:development',
        'serve'
    ]);
};
