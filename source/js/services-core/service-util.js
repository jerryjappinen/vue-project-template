
V.services.util = {

	methods: {



		// String management

		trimWhitespace: function (string) {
			return _.trim(string).replace(/\s\s+/g, ' ');
		},

		getDomainName: function extractDomain (string) {
			var domain;

			// Find & remove protocol (http, ftp, etc.) and get domain
			if (string.indexOf('://') > -1) {
				domain = string.split('/')[2];
			} else {
				domain = string.split('/')[0];
			}

			// Find & remove port number
			domain = domain.split(':')[0];

			return domain;
		},



		// Events

		eventHasMetaKey: function (event) {
			return event.ctrlKey || event.metaKey ? true : false;
		},

	}

};
