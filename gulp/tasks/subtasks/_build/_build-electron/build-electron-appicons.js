// Copy app icon assets into native project resource folders
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-appicons', function (callback) {

		plugins.runSequence(
			// 'subtask-build-electron-appicons-windows',
			'subtask-build-electron-appicons-osx',
			callback
		);

	});

};
