// Prune the hell out of the whole project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init', function (callback) {

		plugins.runSequence(
			'subtask-init-bower',
			'subtask-init-cordova',
			callback
		);

	});
};