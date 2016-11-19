// Compile, uglify JS
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-js-json', function () {
		var files = gulp.src(config.source['json']);
		console.log(config.targets['core']);
		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (JSON): '
			})))

			// Wrap each template into a named variable
			.pipe(plugins.wrapper({
				header: function (file) {
					var id = file.path.replace(/^.*\/|\.[^.]*$/g, ''); // Get basename
					return 'D.' + id + ' = ';
				},
				footer: ';'
			}))

			// Allow comments in JSON
			.pipe(plugins.stripJsonComments())

			// Concatenate into one file
			.pipe(plugins.concat('json.js', {
				newLine: config.buildOptions.jsNewLine
			}))

			// Declare master variable
			.pipe(plugins.wrapper({
				header: function (file) {
					return 'var D = {};';
				}
			}))

			// Uglify unless in debug mode
			.pipe(plugins.if(!helpers.isDebug(), plugins.uglify()))

			.pipe(gulp.dest(config.targets['core']));
	});
};
