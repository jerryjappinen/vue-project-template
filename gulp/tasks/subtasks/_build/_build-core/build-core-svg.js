// Compile raw SVG icons to an SVG sprite
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-svg', function () {

		// Original SVG files
		var files = gulp.src(config.source['svg']);

		// https://github.com/ben-eb/gulp-svgmin
		var svgminConfig = {
			plugins: [
				{ removeDoctype: true },
				{ removeComments: true },
				{
					convertColors: {
						names2hex: false,
						rgb2hex: false
					}
				}
			]
		};

		// https://github.com/jkphl/svg-sprite#configuration-basics
		// https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md
		var svgSpriteConfig = {

			// Enable symbol mode in the plugin
			mode: {
				symbol: {
					// example: true,
					dest: "",
					sprite: config.buildOptions.svg.spriteFileName + '.svg'
				}
			},

			svg: {
				xmlDeclaration: false, // strip out the XML attribute
				doctypeDeclaration: false, // don't include the !DOCTYPE declaration
				namespaceIDs: false,
				dimensionAttributes: false
			}

		};

		// Filtering swig templates
		// var svgFilter = plugins.filter('**/*.sprite.svg', {
		// 	restore: true
		// });

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'SVG: '
			})))

			// Treat some icons here if needed
			// .pipe(svgFilter)
			// .pipe(svgSomethingSomething)
			// .pipe(svgFilter.restore)

			// Optimize input SVG
			.pipe(plugins.if(config.buildOptions.svg.svgo, plugins.svgmin(svgminConfig)))

			// Compile into sprite
			.pipe(plugins.svgSprite(svgSpriteConfig))

			.pipe(gulp.dest(config.targets['core']));
	});
};