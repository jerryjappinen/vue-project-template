// Watch for changes in compiled templates, recompile index when appropriate
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-window-main', function () {

		var dependencies = []
			.concat(config.source.mainDependencies)
			.concat(helpers.getProjectConfigPaths());

		plugins.watch(dependencies, function () {
			plugins.runSequence(
				'subtask-build-window-main'
			);
		});

	});
};
