// Prune the browser version build target destination
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-clear-window', function (callback) {
		return plugins.del([
			config.targets['window'] + '**/*'
		], callback);
	});
};