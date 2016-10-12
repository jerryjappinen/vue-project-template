// Produce appcache manifest file for web app
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-window-manifests-appcache', function () {

		// Fetch files needed to add to manifest (all files)
		var files = gulp.src([
			config.targets['window'] + '**/*'
		], {
			base: './' + config.targets['window']
		});

		return files

			.pipe(plugins.manifest({
				timestamp: true,
				hash: false,
				preferOnline: true,
				network: ['*'],
				exclude: [
					'app.appcache',
					'chrome-manifest.json'
				],
				filename: 'app.appcache'
			}))

			// Send to window
			.pipe(gulp.dest(config.targets['window']));
	});

};