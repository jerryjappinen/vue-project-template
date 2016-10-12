// Copy main html source file into target folder with templates injected
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-main-template', function () {

		// Fetch generated templates from core
		var files = gulp.src([config.source.main['electron-template']]);

		// Filtering swig templates
		var swigFilter = plugins.filter('**/*.swig', {
			restore: true
		});

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (index for electron): '
			})))

			// Build swig template only when extension is .swig
			.pipe(swigFilter)
			.pipe(plugins.swig(helpers.getTemplateOptions('electron')))
			.pipe(swigFilter.restore)

			// Remove HTML comments from these templates
			.pipe(plugins.removeHtmlComments())

			// Name of outputted file
			.pipe(plugins.rename('index.html'))

			.pipe(gulp.dest(config.targets['electron']));
	});

};
