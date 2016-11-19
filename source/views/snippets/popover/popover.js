
V.views['popover'] = {

	props: [
		'value', // shouldBeShown
		'fixed',
		'inPlace'
	],

	data: function () {
		return {
			callback: null
		};
	},

	computed: {

		isFixed: function () {
			return !_.isUndefined(this.fixed);
		},

		isInPlace: function () {
			return !_.isUndefined(this.inPlace);
		},

		state: function () {
			return {
				shown: this.value,
				fixed: this.isFixed,
				inPlace: this.isInPlace
			};
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

	methods: {

		onBackgroundClick: function (event) {
			if (event.target == this.$refs.background) {
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			this.$emit('input', false);
		}

	},

	mounted: function () {
		this.callback = app.lifecycle.register('blur', this.close);
	},

	beforeDestroy: function () {
		if (this.callback) {
			app.lifecycle.unregister('blur', this.close);
		}
	}

};
