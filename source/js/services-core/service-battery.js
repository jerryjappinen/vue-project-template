
V.services.battery = {

	methods: {

		getIsPlugged: function () {
			var dfd = jQuery.Deferred();

			// Cordova plugin
			if (app.plugins.batteryStatus) {
				dfd.resolve(app.plugins.batteryStatus.isPlugged);

			// Web API
			} else if (navigator.getBattery) {
				jQuery.when(navigator.getBattery()).done(function (data) {
					dfd.resolve(data.charging);
				});

			// No idea
			} else {
				dfd.reject();
			}

			return dfd.promise();
		},

		getLevel: function () {
			var dfd = jQuery.Deferred();

			// Cordova plugin
			if (app.plugins.batteryStatus) {
				dfd.resolve(app.plugins.batteryStatus.level);

			// Web API
			} else if (navigator.getBattery) {
				jQuery.when(navigator.getBattery()).done(function (data) {
					dfd.resolve(data.level);
				});

			// No idea
			} else {
				dfd.reject();
			}

			return dfd.promise();
		},

	}

};
