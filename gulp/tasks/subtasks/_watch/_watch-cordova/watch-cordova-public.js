// Watch for changes in public assets, move changed files to target when changes are detected
// FIXME: doesn't delete files
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-public', function () {
		var files = gulp.src(config.source.public + '**/*', {base: config.source.public});
		return files

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (public assets for cordova): '
			})))

			// Sync
			.pipe(plugins.watch(config.source.public, {base: config.source.public}))
			.pipe(gulp.dest(config.targets['cordova'] + config.targets.public));

	});
};
