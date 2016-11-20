
V.services.util = {

	methods: {



		// String management

		getStateClassNames: function (stateHash) {
			var classes = [];

			// State classes
			for (var key in stateHash) {
				var className = _.kebabCase(key.substr(0, 2) == 'is' ? key.substr(2) : key);
				classes.push((stateHash[key] ? 'is-' : 'not-') + className);
			}

			return classes.join(' ');
		},

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



		// DOM

		linkIsExternal: function (el) {
			if (
				el.href &&                             // Is link
				(el.hostname !== location.hostname) && // Is external
				!app.util.eventHasMetaKey(event) &&    // Not using meta key
				(!el.target || el.target === '') &&    // No target specified
				(el.protocol.substr(0,4) === 'http')   // Is an http link
			) {
				return true;
			}
			return false;
		},



		// Events

		eventHasMetaKey: function (event) {
			return (event.ctrlKey || event.metaKey || event.shiftKey);
		}

	}

};
