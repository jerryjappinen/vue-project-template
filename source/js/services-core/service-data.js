
V.services.data = {

	data: function () {
		return {

			useCsv: false, // Defaults to json
			isLoading: true,
			raw: {},

			schema: {
				// 'dataFileName': {}
			}

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
		fetch: function (fileName, json) {
			var dfd = jQuery.Deferred();

			// Default to JSON
			if (!this.useCsv || json) {
				type = 'json';
			} else {
				type = 'csv';
			}

			// Compose URL
			var url = app.paths.dataFolderPath + fileName + '.' + type;

			var options = {
				url: url,
				dataType: this.useCsv ? 'text' : 'json'
			};

			// Handle request callbacks
			var self = this;
			jQuery.ajax(options).done(function (data, textStatus, jqXHR) {

				// Parse as CSV
				if (self.useCsv) {
					data = app.util.parseCsv(data);
				}

				// Store internally
				self.raw[fileName] = data;

				// Resolve
				dfd.resolve(data);

			// Error
			}).fail(function (jqXHR, textStatus, errorThrown) {
				dfd.reject(Error('Request failed to: ' + url));
			});

			return dfd.promise();
		},



		// Life cycle

		onLoad: function () {
			var dfd = jQuery.Deferred();
			var vm = this;

			var promises = [];

			// Do this here so Vue won't track these unnecessarily
			this.raw = {};
			for (var key in this.schema) {

				// Add placeholder for data
				this.raw[this.schema[key]] = {};

				// Fetch raw data
				promises.push(this.fetch(key));

			}

			// Mark onLoad done
			jQuery.when.apply(jQuery, promises).done(function () {
				vm.isLoading = false;
				dfd.resolve();
			});

			return dfd.promise();
		}

	}

};
