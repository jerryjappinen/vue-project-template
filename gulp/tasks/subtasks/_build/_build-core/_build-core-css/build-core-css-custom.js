// Compile, autoprefix and, minify CSS
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-css-custom', function () {
		var files = gulp.src(config.source['css']);
		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (CSS): '
			})))

			// We want a single file
			.pipe(plugins.concat('custom.css'))

			// FIXME: CSS preprocessor stuff should be more dynamic

			// Parse all as a single LESS batch
			.pipe(
				plugins.if(
					config.buildOptions.cssPreProcessor.toLowerCase() == 'less',
					plugins.less({
						paths: ['.'],
						compress: false
					})
				)
			)

			// Parse all as a single SCSS batch
			.pipe(
				plugins.if(
					config.buildOptions.cssPreProcessor.toLowerCase() == 'scss',
					plugins.sass.sync().on('error', plugins.sass.logError)
				)
			)

			// Destination changes, manipulate internal URLs to point to public/
			.pipe(plugins.cssUrlAdjuster({
				prepend: config.buildOptions.coreAssetPathBacktrack + config.targets.public
			}))

			// Autoprefix
			.pipe(plugins.autoprefixer({
				browsers: config.buildOptions.browserslist
			}))

			// Minify if not in debug mode
			.pipe(plugins.if(!helpers.isDebug(), plugins.cleanCss(config.buildOptions.cleanCss)))

			// Done
			.pipe(gulp.dest(config.targets['core']));
	});
};