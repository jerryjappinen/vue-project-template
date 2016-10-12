// Watch for changes in Vue component templates or view models files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core-vue-templates', function () {
		var filesToWatch = [].concat(
			config.source['vue']['templates']
		);
		plugins.watch(filesToWatch, function () {
			plugins.runSequence(
				'subtask-build-core-vue-templates'
			);
		});
	});
};
