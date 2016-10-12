// Compose Vue component templates from source JS and HTML files
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-vue-templates', function () {

		// Templates
		var files = gulp.src(config.source['vue']['templates']);

		// Filtering swig templates from stock HTML
		var swigFilter = plugins.filter('**/*.swig', {
			restore: true
		});

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (Vue template): '
			})))

			// Build swig template only when extension is .swig
			.pipe(swigFilter)
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'Parsing swig (Vue template): '
			})))
			.pipe(plugins.swig(helpers.getTemplateOptions()))
			.pipe(swigFilter.restore)

			// Remove HTML comments from these templates
			.pipe(plugins.removeHtmlComments())

			// Escape HTML to not break JS
			.pipe(plugins.jsEscape())

			// Wrap each template into a named variable
			.pipe(plugins.wrapper({
				header: function (file) {
					var id = file.path.replace(/^.*\/|\.[^.]*$/g, ''); // Get basename
					return 'if (!V.views["' + id + '"]) { V.views["' + id + '"] = {}; } V.views["' + id + '"].template = ';
				},
				footer: ';'
			}))

			// Concatenate into one collection
			.pipe(plugins.concat('vueTemplates.js', { newLine: '' }))

			// Beautify for debug mode
			.pipe(plugins.if(helpers.isDebug(), plugins.beautify(config.buildOptions.jsDebugFormatting)))

			.pipe(gulp.dest(config.targets['core']));

	});
};
