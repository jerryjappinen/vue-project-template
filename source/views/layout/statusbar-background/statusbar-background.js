
// V.views['statusbar-background'] = {

// 	props: [
// 		'online'
// 	],

// 	data: function () {
// 		return {

// 			// Variations per active view
// 			variations: {
// 				article: 'transparent',
// 				cover: 'dark'
// 			}

// 		};
// 	},

// 	computed: {

// 		state: function () {
// 			// Get active view
// 			var current = this.$route.name;
// 			return this.variations[current] ? this.variations[current]: 'default';
// 		},

// 		classes: function () {
// 			return 'is-' + this.state + ' ' + (this.online ? 'is' : 'not') +  '-online';
// 		}

// 	}

// };
