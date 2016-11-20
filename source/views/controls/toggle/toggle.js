
// This input is used by passing v-model="someValue"
// Internally this translates to tw-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

V.views['toggle'] = {

	// Incoming
	props: [
		'value',
		'disabled'
	],

	// Properties
	data: function () {
		return {
			isOn: this.value
		};
	},

	// Computed properties
	computed: {

		state: function () {
			return {
				on: this.value,
				disabled: this.disabled
			};
		},

		classes: function () {
			return app.util.getStateClassNames(this.state);
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
			return this.isOn ? this.toggleOff() : this.toggleOn();
		},

		click: function () {
			if (!this.disabled) {
				this.toggle();
			}
			return this;
		}

	}

};
