
V.services.storage = {

	computed: {

		isAvailable: function () {
			return window.localStorage || app.plugins.localforage ? true : false;
		}

	},

	methods: {

		// API

		clearAll: function () {
			return this.proxy('clear');
		},

		map: function (callback) {
			return this.proxy('iterate', [callback ? callback : function (value, key, index) {
				app.log.info(value, key, index);
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
			var vm = this;
			return new Promise(function (resolve, reject) {

				if (app.plugins.localforage) {

					if (!args) {
						args = [];
					}

					// Proxy for promises
					args.push(function (error, value) {
						if (error) {
							reject(error);
						} else {
							resolve(value);
						}
					});

					// Run a localstorage function with arguments and callback
					app.plugins.localforage[func].apply(app.plugins.localforage, args);

				// Vanilla support
				} else if (window.localStorage && window.localStorage[func]) {
					window.localStorage[func].apply(window.localStorage, args);
					resolve();

				} else {
					reject(new Error('localstorage is not supported in this browser.'));
				}

			});

		},



		// Life cycle

		// onInit: function () {
		// 	Localforage.foo();
		// }

	}

};
