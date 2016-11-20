
V.views['home'] = {

	// Incoming
	// props: [],

	// Properties
	data: function () {
		return {
		};
	},

	// Computed properties
	computed: {

		self: function () {
			return this;
		},

		state: function () {
			return {};
		},

		classes: function () {
			return app.util.getStateClassNames(this.state);
		}

	},

	// Behavior
	methods: {
	},



	// Life cycle

	mounted: function () {

		// Do something when first starting up
		// var vm = this;
		// _.defer(function () {
		// 	vm.open(vm.getInitialCard());
		// });

	}

};
