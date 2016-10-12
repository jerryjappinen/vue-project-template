// Build Cordova's config.xml from a template overwriting default from init
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-manifest', function () {

		// Fetch template
		var files = gulp.src([config.source.manifests['cordova']]);

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (cordova manifest): '
			})))

			// Build swig template only when extension is .swig
			.pipe(plugins.swig(helpers.getTemplateOptions()))

			// Name of outputted file
			.pipe(plugins.rename('config.xml'))

			.pipe(gulp.dest(config.buildOptions['cordova']['paths']['root']));
	});

};
