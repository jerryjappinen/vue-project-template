
// Main service wrapper
V.app = {

	// NOTE: service-router will register itself here
	router: null,

	template: '<component v-bind:is="options.mainComponent"></component>',

	data: function () {

		var data = {
			options: {},
			plugins: {}
		};

		// Generate placeholders for child services
		for (var key in V.services) {
			data[key] = null;
		}

		return data;
	},

	methods: {

		// Helpers to use via `app.`

		// Produce a new content type object
		get: function () {
			return this.contentType.generate.apply(this.contentType, arguments);
		},



		// Life cycle

		// Run any arbitrary method of all child services that provide it, with a promise returned
		runServiceRoutine: function (callbackName) {
			var dfd = jQuery.Deferred();

			// Collect child service callbacks that are available
			var deferreds = [];

			// Run each callback
			for (var key in V.services) {
				if (this[key][callbackName]) {
					deferreds.push(this[key][callbackName]());
				}
			}

			// Wait for callbacks to have run
			jQuery.when.apply(jQuery, deferreds).done(function() {
				dfd.resolve();

			// Fail message
			}, function (e) {
				dfd.reject('Child service callback failed');
			});

			return dfd.promise();
		},



		// Generate child service Vue objects
		constructServices: function () {
			for (var key in V.services) {
				this[key] = new V.services[key]();
			}
			return this;
		},



		// Init services after Vue instance is alive
		initServices: function () {
			var vm = this;
			var dfd = jQuery.Deferred();

			// Initialize services
			vm.runServiceRoutine('onInit').done(function () {
				dfd.resolve();
			});

			return dfd.promise();
		},



		// Mount to main app container as specified in config
		// NOTE: if router has been set up by this point, it will automatically work
		mount: function () {
			var vm = this;

			if (app.options.debug) {
				l('Mounting app...');
			}

			// Load crucial data after first render
			vm.runServiceRoutine('beforeMount').done(function () {

				// Mount to DOM
				vm.$mount(app.options.appContainer);

				// Load crucial data after first render
				vm.$nextTick(function () {
					vm.runServiceRoutine('onLoad').done(function () {
						vm.runServiceRoutine('afterLoad');
					});
				});

			});

			return this;
		},



		// Run all start-up logic
		run: function () {
			var vm = this;
			var dfd = jQuery.Deferred();

			this.constructServices().initServices().done(function () {
				vm.mount();
				dfd.resolve();
			});

			return dfd.promise();
		}

	}

};
