// Copy main html source file into target folder with templates injected
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-main', function () {

		// Fetch generated templates from core
		var files = gulp.src([config.source.main['cordova']]);

		// Filtering swig templates
		var swigFilter = plugins.filter('**/*.swig', {
			restore: true
		});

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (index for cordova): '
			})))

			// Build swig template only when extension is .swig
			.pipe(swigFilter)
			.pipe(plugins.swig(helpers.getTemplateOptions('cordova')))
			.pipe(swigFilter.restore)

			// Name of outputted file
			.pipe(plugins.rename('index.html'))

			.pipe(gulp.dest(config.targets['cordova']));
	});

};
