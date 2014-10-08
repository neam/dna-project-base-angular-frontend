module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
        'sass:dev',
        'concat:app',
		//'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
