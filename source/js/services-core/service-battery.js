
V.services.battery = {

	methods: {

		getIsPlugged: function () {
			var vm = this;
			return new Promise(function (resolve, reject) {

				// Cordova plugin
				if (app.plugins.batteryStatus) {
					resolve(app.plugins.batteryStatus.isPlugged);

				// Web API
				} else if (navigator.getBattery) {
					navigator.getBattery().then(function (data) {
						resolve(data.charging);
					});

				// No idea
				} else {
					resolve(null);
				}

			});
		},

		getLevel: function () {
			var vm = this;
			return new Promise(function (resolve, reject) {

				// Cordova plugin
				if (app.plugins.batteryStatus) {
					resolve(app.plugins.batteryStatus.level);

				// Web API
				} else if (navigator.getBattery) {
					navigator.getBattery().then(function (data) {
						resolve(data.level);
					});

				// No idea
				} else {
					resolve(null);
				}

			});
		},

	}

};
