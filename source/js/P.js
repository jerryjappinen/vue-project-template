
var P = {

	// Map global plugin object names to names used in app
	// NOTE: key will be used as `app.plugins[key]`, value is what plugin has exported to `window`
	mapping: {},

	// InitPlugin callbacks are added here (run before app is constructed)
	callbacks: {},



	// Life cycle

	initPlugin: function (key, debug) {
		if (this.exists(key) && this.callbacks[key]) {
			this.callbacks[key](debug);
		}
		return this;
	},

	bootstrap: function (mapping, debug) {
		window.pluginExistsChecks = [];

		if (mapping) {
			this.mapping = mapping;
		}

		// Init all plugins
		for (var key in this.callbacks) {
			this.initPlugin(key, debug);
		}

		return this;
	},



	// Helpers

	exists: function (key) {
		return this.get(key) ? true : false;
	},

	getIndex: function getIndex(obj, i) {
		return obj[i];
	},

	get: function (key) {
		var result = null;
		try {
			result = (this.mapping[key]).split('.').reduce(this.getIndex, window);
		} catch(error) {
			window.pluginExistsChecks.push(error);
		} finally {
			return result;
		}
	},

	getAll: function () {
		var plugins = {};
		for (var key in this.mapping) {
			window.pluginExistsChecks.push([key, this.mapping[key], this.get(key)]);
			if (this.exists(key)) {
				plugins[key] = this.get(key);
			}
		}
		return plugins;
	}

};
