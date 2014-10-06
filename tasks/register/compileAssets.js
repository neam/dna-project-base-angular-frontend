module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
        'sass:dev',
		//'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
