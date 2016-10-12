
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
			var classes = [];

			// State classes
			for (var key in this.state) {
				var className = _.kebabCase(key.substr(0, 2) == 'is' ? key.substr(2) : key);
				classes.push((this.state[key] ? 'is-' : 'not-') + className);
			}

			return classes.join(' ');
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
