
// NOTE: add support for merging local storage data and user profile data

V.services.preferences = {

	data: function () {
		return {
			values: {
				sounds: false
			}
		};
	},

	computed: {

		keys: function () {
			return _.keys(this.values);
		}

	},

	methods: {

		loadValues: function (newValues) {
			for (var key in newValues) {
				if (_.has(this.values, key)) {
					this.values[key] = newValues[key];
				}
			}
		},

		// Value-specific API
		toggleSounds: function () {
			if (this.values.sounds) {
				this.values.sounds = false;
			} else {
				this.values.sounds = true;
			}
			return this;
		}

	}

};
