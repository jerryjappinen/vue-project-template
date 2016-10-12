// Watch for changes in compiled core asset files, recompile window's stylesheet file when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-coreassets-svg', function () {
		plugins.watch(config.targets['core'] + '/**/*.svg', function () {
			plugins.runSequence(
				'subtask-build-window-coreassets-svg'
			);
		});
	});
};