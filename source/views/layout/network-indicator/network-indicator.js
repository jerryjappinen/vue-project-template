
V.views['network-indicator'] = {

	props: [
		'online'
	],

	computed: {
		classes: function () {
			return (this.online ? 'not' : 'is') +  '-active';
		}
	}

};
