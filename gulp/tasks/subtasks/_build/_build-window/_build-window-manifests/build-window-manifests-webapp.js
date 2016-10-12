// Build web app JSON
// https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-window-manifests-webapp', function () {

		// Fetch template
		var files = gulp.src([config.source.manifests['window']]);

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (window manifest): '
			})))

			// Build from swig template
			.pipe(plugins.swig(helpers.getTemplateOptions()))

			// Name of outputted file
			.pipe(plugins.rename('manifest.json'))

			.pipe(gulp.dest(config.targets['window']));
	});

};
