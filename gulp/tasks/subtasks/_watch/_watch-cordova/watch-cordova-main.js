// Watch for changes in compiled templates, recompile index when appropriate
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-main', function () {

		var dependencies = []
			.concat(config.source.mainDependencies)
			.concat(helpers.getProjectConfigPaths());

		plugins.watch(dependencies, function () {
			gulp.start('subtask-build-cordova-main');
		});

	});
};
