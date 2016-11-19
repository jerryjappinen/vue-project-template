
V.services.log = {

	// data: function () {
	// 	return {
	// 	};
	// },

	// computed: {},

	methods: {

		proxy: function (func, args) {
			if (app.options.debug) {
				if (app.plugins.log && app.plugins.log[func]) {
					return app.plugins.log[func].apply(app.plugins.log, args);
				} else {
					return console.log.apply(console.log, args);
				}
			}
		},

		trace: function () { return this.proxy('trace', arguments); },

		debug: function () { return this.proxy('debug', arguments); },

		info: function () { return this.proxy('info', arguments); },

		warn: function () { return this.proxy('warn', arguments); },

		error: function () { return this.proxy('error', arguments); }

	}

};
