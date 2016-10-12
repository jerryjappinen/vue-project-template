// Compile vendor scripts for dev or production build
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-js-vendor', function () {

		// Shared vendor files
		var paths = config.source['vendor']['all'];

		// Vendor files for dev builds
		if (helpers.isDebug()) {
			paths = paths.concat(config.source['vendor']['debug']);

		// Vendor files for production builds
		} else {
			paths = paths.concat(config.source['vendor']['production']);
		}

		// Get JS files
		for (var i = 0; i < paths.length; i++) {
			paths[i] = paths[i] + '**/*.js';
		}

		var files = gulp.src(paths);

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (vendor JS): '
			})))

			// Concatenate into one file
			.pipe(plugins.concat('vendor.js', {
				newLine: config.buildOptions.jsNewLine
			}))

			// Uglify unless in debug mode
			// NOTE: we don't do this at all: in production, where this is needed, all files are already minified
			// .pipe(plugins.if(!helpers.isDebug(), plugins.uglify()))

			// But we do remove comments
			.pipe(plugins.if(!helpers.isDebug(), plugins.stripComments()))

			.pipe(gulp.dest(config.targets['core']));
	});
};
