
V.services.storage = {

	computed: {

		isAvailable: function () {
			return window.localStorage || app.plugins.localforage ? true : false;
		}

	},

	methods: {

		// API

		clear: function (confirm) {
			if (confirm) {
				return this.proxy('clear');
			}
			return l('Really clear everything?', this.list());
		},

		map: function (callback) {
			return this.proxy('iterate', [callback ? callback : function (value, key, index) {
				l(value, key, index);
			}]);
		},

		list: function () {
			return this.proxy('keys');
		},

		get: function (key) {
			return this.proxy('getItem', [key]);
		},

		set: function (key, value) {
			return this.proxy('setItem', [key, value]);
		},

		remove: function (key) {
			return this.proxy('removeItem', [key]);
		},



		// Wrap the library in use
		proxy: function (func, args) {
			var dfd = app.plugins.jQuery.Deferred();

			if (app.plugins.localforage) {

				if (!args) {
					args = [];
				}

				// Proxy for promises
				args.push(function (error, value) {
					l(error, value);
					if (!error) {
						dfd.resolve(value);
					} else {
						dfd.reject(error);
					}
				});

				// Run a localstorage function with arguments and callback
				app.plugins.localforage[func].apply(app.plugins.localforage, args);

			// Vanilla support
			} else if (window.localStorage && window.localStorage[func]) {
				window.localStorage[func].apply(window.localStorage, args);

			} else {
				dfd.reject();
			}

			return dfd.promise();
		},



		// Life cycle

		// onInit: function () {
		// 	Localforage.foo();
		// }

	}

};
