
V.services.contentType = {

	// data: function () {
	// 	return {
	// 	};
	// },

	// computed: {},

	methods: {

		generate: function (contentType, inputData, passive) {
			var Proto = V.contentTypes[contentType];

			if (Proto) {

				// Allow injecting properties to constructor directly
				var obj;
				if (!passive) {
					obj = new Proto({
						data: _.merge({}, inputData)
					});
				} else {
					obj = new Proto();
				}

				// Generate object

				// Create object
				if (obj.onInit && _.isFunction(obj.onInit)) {
					obj.onInit();
				}

				// Load data passively
				if (passive) {
					this.onObjectLoad(obj, inputData).done(function () {
						if (obj.onLoad && _.isFunction(obj.onLoad)) {
							obj.onLoad(inputData);
						}
					});

				// Run only custom logic
				} else {
					if (obj.onLoad && _.isFunction(obj.onLoad)) {
						obj.onLoad(inputData);
					}
				}

				return obj;
			}

			return null;
		},

		onObjectLoad: function (obj, data) {
			var dfd = jQuery.Deferred();

			// Add parameter values
			for (var key in data) {
				if (!_.isUndefined(obj[key])) {
					obj[key] = data[key];
				}
			}

			dfd.resolve();

			return dfd.promise();
		}

	}

};
