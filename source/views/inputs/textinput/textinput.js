
// This input is used by passing v-model="someValue"
// Internally this translates to tw-way use of `value` prop
// State of the input is kept track of internally, and the result is $emitted to parent scope
// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

V.views['textinput'] = {

	// Incoming
	props: [
		'name',
		'placeholder',
		'multiline',
		'value',
		'disabled'
	],

	// Properties
	data: function () {
		return {
			isPristine: true,
			isFocused: false,
			ownValue: this.value
		};
	},

	// Computed properties
	computed: {

		state: function () {
			return {
				focused: this.isFocused,
				multiline: this.multiline,
				pristine: this.isPristine,
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

		onFocus: function () {
			this.isFocused = true;
		},

		onFocusOut: function () {
			this.isFocused = false;
		},

		pullChange: function () {
			var newValue = '' + this.value;
			if (this.ownValue !== newValue) {
				this.ownValue = newValue;
			}
			return this;
		},

		emitChange: function () {
			var newValue = '' + this.ownValue;

			if (this.value !== newValue) {

				this.$emit('input', newValue);

				if (this.isPristine) {
					this.isPristine = false;
				}

			}

			return this;
		}

	},

	watch: {
		value: 'pullChange',
		ownValue: _.debounce(function () {
			this.emitChange();
		}, 150)
	}

};
