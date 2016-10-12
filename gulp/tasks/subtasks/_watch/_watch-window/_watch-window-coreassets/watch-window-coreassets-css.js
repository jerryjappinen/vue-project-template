// Watch for changes in compiled core asset files, recompile window's stylesheet file when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-window-coreassets-css', function () {
		plugins.watch(config.targets['core'] + '/**/*.css', function () {
			plugins.runSequence(
				'subtask-build-window-coreassets-css'
			);
		});
	});
};