// Watch for changes in compiled core asset files, recompile cordova's stylesheet file when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-coreassets-css', function () {
		plugins.watch(config.targets['core'] + '/**/*.css', function () {
			plugins.runSequence(
				'subtask-build-cordova-coreassets-css'
			);
		});
	});
};