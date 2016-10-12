// Compile, uglify JS
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-js-custom', function () {
		var files = gulp.src(config.source['js']);
		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (JS): '
			})))

			// Concatenate into one file
			.pipe(plugins.concat('custom.js', {
				newLine: config.buildOptions.jsNewLine
			}))

			// Uglify unless in debug mode
			.pipe(plugins.if(!helpers.isDebug(), plugins.uglify()))

			.pipe(gulp.dest(config.targets['core']));
	});
};
