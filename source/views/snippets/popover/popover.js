
V.views['popover'] = {

	props: [
		'show',
		'fixed',
		'inPlace'
	],

	data: function () {
		return {
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
				shown: this.show,
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

	}, mounted: function () { window.popover = this; }

};
