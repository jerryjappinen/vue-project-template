// Build package.json for Electron
// http://electron.atom.io/docs/tutorial/quick-start/
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-manifest', function () {

		// Fetch template
		var files = gulp.src([config.source.manifests['electron']]);

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (electron manifest): '
			})))

			// Build from swig template
			.pipe(plugins.swig(helpers.getTemplateOptions()))

			// Name of outputted file
			.pipe(plugins.rename('package.json'))

			.pipe(gulp.dest(config.targets['electron']));
	});

};
