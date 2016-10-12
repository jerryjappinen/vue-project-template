// Produce appcache manifest file for web app
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-window-manifests', function (callback) {

		plugins.runSequence(
			[
				// 'subtask-build-window-manifests-appcache',
				'subtask-build-window-manifests-webapp'
			],
			callback
		);

	});
};
