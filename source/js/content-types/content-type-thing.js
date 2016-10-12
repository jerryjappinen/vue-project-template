
V.contentTypes.thing = {

	data: function () {
		return {

			// Primitive properties
			id: '',
			name: ''

		};
	},

	computed: {

		isReal: function () {
			return this.id.length && this.name.length;
		}

	}

	// methods: {}

	// created: function () {}

	// destroyed: function () {}

};
