/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
        app: {
            src: [
                'assets/js/app/app.js',
                'assets/js/app/helpers/**/*.js',
                'assets/js/app/config/**/*.js',
                'assets/js/app/services/**/*.js',
                'assets/js/app/filters/**/*.js',
                'assets/js/app/base/**/*.js',
                'assets/js/app/directives/**/*.js',
                'assets/js/app/resources/**/*.js',
                'assets/js/app/controllers/**/*.js',
                'assets/js/app/**/*.js',
                '!assets/js/app/config/local.dist.js'
            ],
            dest: 'assets/js/main.js'
        },
		css: {
			src: require('../pipeline').cssFilesToInject,
			dest: '.tmp/public/concat/production.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
