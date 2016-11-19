
V.services.json = {

	data: function () {
		return {
			all: {}
		};
	},

	// data: {},

	// computed: {},

	methods: {

		get: function (key, pointer) {
			return _.get(this.all[key], pointer);
		},



		// Life cycle

		beforeMount: function () {
			if (window.D) {
				this.all = window.D;
			}
		}

	}

};
