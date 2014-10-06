/**
 * Compiles Sass files into CSS.
 */
module.exports = function(grunt) {
    grunt.config.set('sass', {
        dev: {
            options: {
                style: 'expanded',
                compass: true
            },
            files: {
                '.tmp/public/styles/main.css': 'assets/styles/importer.sass'
            }
        },
        dist: {
            options: {
                style: 'compressed',
                compass: true
            },
            files: {
                '<%= paths.environments %>/prod/web/css/main.css': '<%= paths.sass %>/main.sass'
            }
        }
    });

    /*
    dev: {
        files: [{
            expand: true,
            cwd: 'assets/styles/',
            src: ['importer.less'],
            dest: '.tmp/public/styles/',
            ext: '.css'
        }]
    }
    */

    grunt.loadNpmTasks('grunt-contrib-sass');
};
