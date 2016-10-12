// Prune the hell out of the whole project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-uninit', function (callback) {

		plugins.runSequence(
			[
				'subtask-uninit-bower',
				'subtask-uninit-cordova'
			],
			callback
		);

	});
};