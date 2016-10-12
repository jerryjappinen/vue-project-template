// Copy compiled core assets into target folder in a format that makes sense
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-coreassets', function (callback) {

		plugins.runSequence(
			[
				'subtask-build-cordova-coreassets-svg',
				'subtask-build-cordova-coreassets-css',
				'subtask-build-cordova-coreassets-js'
			],
			callback
		);

	});

};