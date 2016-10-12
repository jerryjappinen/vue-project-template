// Watch for changes in compiled core asset files, recompile window's script file when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-window-coreassets-js', function () {
		plugins.watch(config.targets['core'] + '/**/*.js', function () {
			plugins.runSequence(
				'subtask-build-window-coreassets-js'
			);
		});
	});
};