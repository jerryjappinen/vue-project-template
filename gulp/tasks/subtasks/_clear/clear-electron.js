// Prune the app's electron build target
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-clear-electron', function (callback) {
		return plugins.del([
			config.targets['electron-release'] + '**/*',
			config.targets['electron'] + '**/*'
		], callback);
	});
};
