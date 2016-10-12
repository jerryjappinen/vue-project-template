module.exports = function (main) {
	return function (env) {

		// Main template data
		var data = main.plugins.merge.recursive(true,
			main.config,
			{
				debug: main.args.debug,
				env: env
			}
		);

		// init.swig will get this and pass on to window scope
		data.clientConfig = main.plugins.merge.recursive(true,
			main.config.clientConfig.base,
			main.config.clientConfig[env],
			{
				meta: main.config.meta,
				debug: main.args.debug,
				env: env
			}
		);

		// Allow passing more hashes to merge
		data = main.plugins.merge.recursive.apply(this, [true, data].concat(arguments));

		return {
			data: data,
			defaults: {
				cache: false
			},
			setup: function (s) {
				main.plugins.swigMarked.useTag(s, 'markdown');
				main.plugins.swigMarked.useFilter(s, 'markdown');
			}
		};

	};
};
