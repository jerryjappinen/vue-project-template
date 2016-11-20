
// This input is used by passing v-model="someValue"
// Internally this translates to tw-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

V.views['set'] = {

	// Incoming
	props: [
		'value',
		'disabled',
		'to'
	],

	// Properties
	data: function () {
		return {
			ownValue: this.value,
			defaultValue: true
		};
	},

	// Computed properties
	computed: {

		targetValue: function () {
			if (!_.isUndefined(this.to)) {
				return this.to;
			}
			return this.defaultValue;
		},

		isOn: function () {
			return this.ownValue === this.to ? true : false;
		},

		state: function () {
			return {
				on: this.isOn,
				disabled: this.disabled
			};
		},

		classes: function () {
			return app.util.getStateClassNames(this.state);
		}

	},

	// Behavior
	methods: {

		set: function () {
			// app.log.info('set', this.targetValue);
			this.ownValue = this.targetValue;
			this.$emit('input', this.ownValue);
			return this;
		},

		click: function () {
			if (!this.disabled) {
				this.set();
			}
			return this;
		}

	}

};
