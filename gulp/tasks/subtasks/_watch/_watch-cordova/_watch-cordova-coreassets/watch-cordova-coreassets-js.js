// Watch for changes in compiled core asset files, recompile cordova's script file when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-coreassets-js', function () {
		plugins.watch(config.targets['core'] + '/**/*.js', function () {
			plugins.runSequence(
				'subtask-build-cordova-coreassets-js'
			);
		});
	});
};