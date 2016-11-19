
V.services.json = {

	data: function () {
		return {
			isLoaded: false,
			raw: {},
			files: app.options.json ? app.options.json : []
		};
	},

	// data: {},

	// computed: {},

	methods: {

		getByProperty: function (dataType, property, value) {
			var data = this.raw[dataType];
			if (data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i][property] === value) {
						return data[i];
					}
				}
			}
			return null;
		},



		// Setup

		// Fetch data from files under public
		fetch: function (fileName) {
			var vm = this;
			return new Promise(function (resolve, reject) {

				// Compose URL
				var url = app.paths.json + fileName + '.' + 'json';

				var options = {
					url: url,
					dataType: 'json'
				};

				// Handle request callbacks
				// NOTE: there should be a global D object created by Gulp so we don't have to request these client-side
				app.plugins.jQuery.ajax(options).done(function (data, textStatus, jqXHR) {

					// Parse as CSV
					if (vm.useCsv) {
						data = app.util.parseCsv(data);
					}

					// Store internally
					vm.raw[fileName] = data;

					// Resolve
					resolve(data);

				// Error
				}).fail(function (jqXHR, textStatus, errorThrown) {
					reject(new Error('Request failed to: ' + url));
				});

			});
		},



		// Life cycle

		afterMount: function () {
			var vm = this;
			var promises = [];

			// Do this here so Vue won't track these unnecessarily
			for (var i = 0; i < this.files.length; i++) {
				var key = this.files[i];

				// Add placeholder for data
				// NOTE: Vue won't track new keys unless they're added with $set
				this.raw[key] = {};

				// Fetch raw data
				promises.push(this.fetch(key));

			}

			// Mark onLoad done
			Promise.all(promises).then(function () {
				vm.isLoaded = true;
			});

		}

	}

};
