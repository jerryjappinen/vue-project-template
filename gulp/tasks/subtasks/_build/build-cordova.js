// Build www for mobile version of the project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova', function (callback) {

		plugins.runSequence(
			'subtask-build-cordova-manifest',
			[
				'subtask-build-cordova-coreassets',
				'subtask-build-cordova-main',
				'subtask-build-cordova-public'
			],
			'subtask-build-cordova-platforms',
			[
				'subtask-build-cordova-appicons',
				'subtask-build-cordova-launchimages'
			],
			callback
		);

	});
};
