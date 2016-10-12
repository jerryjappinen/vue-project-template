// Watch for changes in in project.json and trigger full rebuild
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-project-config', function () {
		plugins.watch(helpers.getProjectConfigPaths(), function () {
			gulp.start('subtask-build-core');
		});
	});
};
