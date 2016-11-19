
V.services.http = {

	data: function () {
		return {
		};
	},

	computed: {},

	methods: {

		get: function (url) {
			return fetch(url, {
				method: 'GET'
			});
		},

		post: function (url, body, headers) {
			return fetch(url, {
				method: 'POST',
				body: body,
				headers: headers ? headers : {}
			});
		},

		postJson: function (url, json) {
			return this.post(url, JSON.stringify(json), { 'Content-Type': 'application/json' });
		},

		upload: function (url, key, fileInput, otherData) {
			var data = new FormData();
			data.append(key, fileInput.files[0]);
			for (var otherKey in otherData) {
				otherData.append(otherKey, otherData[otherKey]);
			}
			return this.post(url, data);
		}

	}

};
