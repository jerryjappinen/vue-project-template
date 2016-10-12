// Prune the core build target destination
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-clear-core', function (callback) {
		return plugins.del([
			config.targets['core'] + '**/*'
		], callback);
	});
};