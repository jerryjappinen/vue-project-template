
// This input is used by passing v-model="someValue"
// Internally this translates to tw-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

V.views['checkbox'] = {

	// Incoming
	props: [
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

		state: function () {
			return {
				on: this.value,
				disabled: this.disabled
			};
		},

		classes: function () {
			return app.util.getStateClassNames(this.state);
		}

	}

};
