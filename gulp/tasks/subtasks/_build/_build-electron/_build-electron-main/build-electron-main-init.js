// Copy main html source file into target folder with templates injected
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-main-init', function () {

		// Fetch Electron init script from core
		var files = gulp.src([config.source.main['electron-init']]);

		// Filtering swig templates
		var swigFilter = plugins.filter('**/*.swig', {
			restore: true
		});

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (init script for electron): '
			})))

			// Build swig template only when extension is .swig
			.pipe(swigFilter)
			.pipe(plugins.swig(helpers.getTemplateOptions('electron')))
			.pipe(swigFilter.restore)

			// Name of outputted file
			.pipe(plugins.rename('index.js'))

			.pipe(gulp.dest(config.targets['electron']));
	});

};
