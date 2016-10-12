
V.services.storage = {

	methods: {

		// API

		clear: function (confirm) {
			if (confirm) {
				return this.proxyLocalforage('clear');
			}
			return l('Really clear everything?', this.list());
		},

		map: function (callback) {
			return this.proxyLocalforage('iterate', [callback ? callback : function (value, key, index) {
				l(value, key, index);
			}]);
		},

		list: function () {
			return this.proxyLocalforage('keys');
		},

		get: function (key) {
			return this.proxyLocalforage('getItem', [key]);
		},

		set: function (key, value) {
			return this.proxyLocalforage('setItem', [key, value]);
		},

		remove: function (key) {
			return this.proxyLocalforage('removeItem', [key]);
		},



		// Wrap the library in use
		proxyLocalforage: function (func, args) {
			var dfd = jQuery.Deferred();

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

			return dfd.promise();
		},



		// Life cycle

		// onInit: function () {
		// 	Localforage.foo();
		// }

	}

};
