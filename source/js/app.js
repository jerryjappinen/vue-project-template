
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
			var vm = this;
			return new Promise(function (resolve, reject) {

				// Collect child service callbacks that are available
				var promises = [];

				// Run each callback
				for (var key in V.services) {
					if (vm[key][callbackName]) {
						app.log.info('runServiceRoutine', key, callbackName);
						promises.push(vm[key][callbackName]());
					}
				}

				// Return wrapper promise
				Promise.all(promises).then(function () {
					resolve();
				}, function (error) {
					reject(error);
				});

			});
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
			return new Promise(function (resolve, reject) {

				// Initialize services
				vm.runServiceRoutine('onInit').then(function () {
					resolve();
				}, function (error) {
					reject(error);
				});
				
			});
		},



		// Mount to main app container as specified in config
		// NOTE: if router has been set up by this point, it will automatically work
		mount: function () {
			var vm = this;

			app.log.info('Mounting app...');

			// Load crucial data after first render
			vm.runServiceRoutine('beforeMount').then(function () {

				app.log.trace('beforeMount');

				// Mount app to DOM
				vm.$mount(app.options.appContainer);

				// Load crucial data after first render
				vm.$nextTick(function () {

				app.log.trace('afterMount');

					vm.runServiceRoutine('afterMount');
				});

			});

			return this;
		},



		// Run all start-up logic
		run: function () {
			var vm = this;
			return new Promise(function (resolve, reject) {

				vm.constructServices().initServices().then(function () {
					vm.mount();
					resolve(vm);
				}, function (error) {
					reject(error);
				});

			});

		}

	}

};
