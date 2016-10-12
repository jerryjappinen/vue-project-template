
V.services.lifecycle = {

	data: function () {
		return {

			// Lifecycle events to tap into
			callbacks: {
				pause: [], // Also fired on `resign` on iOS
				resume: [], // Also fired on `active` on iOS
				menu: [],
				search: [],
				backbutton: [],
				resize: []
			}

		};
	},

	computed: {

		events: function () {
			return _.keys(this.callbacks);
		}

	},

	methods: {



		// API

		// Store callback for firing during device events
		register: function (event, callback) {
			var bucket = this.callbacks[event];
			if (bucket && _.isFunction(callback)) {
				if (!_.includes(bucket)) {
					bucket.push(callback);
				}
				return callback;
			}
			return null;
		},

		// Remove callback from the set of callbacks fired with these events
		unRegister: function (event, callback) {
			var bucket = this.callbacks[event];
			if (bucket && _.isFunction(callback)) {
				var i = bucket.indexOf(callback);
				if (i >= 0) {
					bucket.splice(i, 1);
				}
				return callback;
			}
			return null;
		},



		// Helpers

		runCallbacks: function (eventName) {
			var callbacks = this.callbacks[eventName];
			if (callbacks && callbacks.length) 
			for (var i = callbacks.length - 1; i >= 0; i--) {
				callbacks[i]();
			}
		},



		// Service callbacks

		onPause: function () {
			this.runCallbacks('pause');
		},

		onResume: function () {
			this.runCallbacks('resume');
		},

		onBack: function () {
			this.runCallbacks('back');
		},

		onMenu: function () {
			this.runCallbacks('menu');
		},

		onSearch: function () {
			this.runCallbacks('search');
		},

		onResize: function () {
			this.runCallbacks('resize');
		},



		// Life cycle

		onInit: function () {

			// Cordova fires these events for us
			// http://cordova.apache.org/docs/en/6.x/cordova/events/events.html
			document.addEventListener('searchbutton', this.onSearch, false);
			document.addEventListener('menubutton', this.onMenu, false);
			document.addEventListener('backbutton', this.onBack, false);
			document.addEventListener('pause', this.onPause, false);
			document.addEventListener('resume', this.onResume, false);

			// Generic
			document.addEventListener('resize', this.onResize, false);

		}

	}

};
