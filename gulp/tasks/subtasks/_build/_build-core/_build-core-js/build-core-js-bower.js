// Bower components
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-js-bower', function () {

		var manifestFile = './bower.json';

		var files = gulp.src(manifestFile);

		return files
			.pipe(plugins.plumber())

			// Use main bower files to actually fetch the real files
			.pipe(plugins.mainBowerFiles({
				overrides: config.buildOptions.bowerOverrides
			}))

			// Apply filter to use only JS files
			.pipe(plugins.filter('**/*.js', {
				// restore: true
			}))

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (vendor JS): '
			})))

			// Concatenate into one file
			.pipe(plugins.concat('bower.js', {
				newLine: ';' + "\n"
			}))

			// Uglify unless in debug mode
			// NOTE: we don't know what bower gives us but we assume it's NOT minified
			.pipe(plugins.if(!helpers.isDebug(), plugins.uglify()))

			.pipe(gulp.dest(config.targets['core']));
	});
};
