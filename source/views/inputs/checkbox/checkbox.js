
// This input is used by passing v-model="someValue"
// Internally this translates to tw-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

V.views['checkbox'] = {

	// Incoming
	props: [
		'radio',
		'value',
		'disabled'
	],

	// Properties
	data: function () {
		return {
			isOn: this.value,
		};
	},

	// Computed properties
	computed: {

		isOff: function () {
			return !this.isOn;
		},

		state: function () {
			return {
				on: this.value,
				radio: this.radio,
				disabled: this.disabled
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

	// Behavior
	methods: {

		toggleOn: function () {
			if (!this.isOn) {
				this.isOn = true;
				this.$emit('input', this.isOn);
			}
			return this;
		},

		toggleOff: function () {
			if (this.isOn) {
				this.isOn = false;
				this.$emit('input', this.isOn);
			}
			return this;
		},

		toggle: function () {

			// Radio buttons can't be toggled off
			if (this.radio) {
				return this.isOff ? this.toggleOn() : this;
			}

			// Checkboxes can be toggle on and off by default
			return this.isOn ? this.toggleOff() : this.toggleOn();
		},

		click: function () {
			if (!this.disabled) {
				this.toggle();
			}
			return this;
		}

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
