
V.services.util = {

	methods: {



		// String management

		trimWhitespace: function (string) {
			return _.trim(string).replace(/\s\s+/g, ' ');
		},

		getSlug: function (string) {
			return window.slugify(string, {
				lowercase: true,
				separator: '-'
			});
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



		// Parsers

		// https://github.com/knrz/CSV.js/
		parseCsv: function (data) {
			var csv = new app.plugins.csv(data, {
				header: true
			});
			return(csv.parse());
		},

		// https://github.com/knrz/CSV.js/
		parseCsvToArrays: function (data) {
			var csv = new app.plugins.csv(data);
			return(csv.parse());
		},

		explodeCsvString: function (stringValue) {
			return stringValue.split(',');
		},



		// Time handling

		formatDuration: function (input) {
			var sec_num = parseInt(input, 10);
			var hours   = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			var seconds = sec_num - (hours * 3600) - (minutes * 60);
			return (hours ? hours + ' h ' : '') + minutes + ' min';
		},

		composeDateString: function (y, m, d) {
			if (_.isDate(y)) {
				d = y.getDate();
				m = y.getMonth() + 1;
				y = y.getFullYear();
			}
			return y + '-' + m + '-' + d;
		},

		composeTimeString: function (h, min) {
			return h + ':' + (min < 10 ? '0' : '') + min;
		},

		// FLAG master programmer boom!!1
		timeDiff: function (time1, time2) {
			return (this.parseDateString('01/01/2000 ' + time2 + ':00') - this.parseDateString('01/01/2000 ' + time1 + ':00')) / 1000;
		},

		timeDiffReverse: function (time1, time2) {
			return this.timeDiff(time2, time1);
		},

		timeIsAfter: function (time1, time2) {
			return this.timeDiffReverse(time1, time2) > 0;
		},

		getWeekNumber: function (dateObject){
			var d = new Date( + dateObject);
			d.setHours(0, 0, 0);
			d.setDate(d.getDate()+4-(d.getDay()||7));
			return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
		},

		parseDateString: function (dateString) {
			return Date.parse(dateString.replace(new RegExp('-', 'g'), '/'));
		},



		// Storage

		proxyLocalforage: function (func, args) {
			var dfd = jQuery.Deferred();

			if (!args) {
				args = [];
			}

			// Proxy for promises
			args.push(function (error, value) {
				l(error, value);
				if (!error) {
					dfd.resolve(value);
				} else {
					dfd.reject(error);
				}
			});

			// Run a localstorage function with arguments and callback
			localforage[func].apply(localforage, args);

			return dfd.promise();
		},

		clear: function (confirm) {
			if (confirm) {
				return this.proxyLocalforage('clear');
			}
			return l('Really clear everything?', this.list());
		},

		map: function (callback) {
			return this.proxyLocalforage('iterate', [callback ? callback : function (value, key, index) {
				l(value, key, index);
			}]);
		},

		list: function () {
			return this.proxyLocalforage('keys');
		},

		get: function (key) {
			return this.proxyLocalforage('getItem', [key]);
		},

		set: function (key, value) {
			return this.proxyLocalforage('setItem', [key, value]);
		},

		remove: function (key) {
			return this.proxyLocalforage('removeItem', [key]);
		}

	}

};
