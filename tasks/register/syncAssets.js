module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
        'sass:dev',
		//'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
