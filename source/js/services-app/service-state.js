
V.services.state = {

	data: function () {
		return {
			isLoaded: false
		};
	},

	// computed: {},

	methods: {



		// State handling

		// 1st load
		getInitialState: function () {

			// Basic format
			var state = {};

			// app.log.info('initial state', state);

			return state;
		},

		collectState: function () {

			// Basic format
			var state = {};

			// Do something with `state`
			if (app.preferences && app.preferences.values) {
				state.preferences = _.merge({}, app.preferences.values);
			}

			return state;
		},

		loadState: function (state) {

			// Do something with `state`
			if (state.preferences) {
				app.preferences.loadValues(state.preferences);
			}

			return this;
		},

		storeState: function () {
			return app.storage.set('state', this.collectState());
		},

		fetchStoredState: function () {
			return app.storage.get('state');
		},



		// Life cycle

		afterMount: function () {
			var vm = this;
			return new Promise(function (resolve, reject) {

				// Load fetched state
				vm.fetchStoredState().then(function (state) {
					if (state) {
						vm.loadState(state);
					} else {
						vm.loadState(vm.getInitialState());
					}

					// Resolve either way
					vm.isLoaded = true;
					resolve();

				// Load initial state if that fails
				}, function () {
					vm.loadState(vm.getInitialState());

					// Resolve either way
					vm.isLoaded = true;
					resolve();

				});

			});

		}

	}

};
