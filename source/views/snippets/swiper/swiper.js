
V.views['swiper'] = {

	props: [
		'component',
		'slides',
		'paginate',
		'options'
	],

	data: function () {
		return {
			swiperInstance: null
		};
	},

	computed: {
		classes: function () {
			return {
				'is-loaded' : this.swiperInstance ? true : false
			};
		}
	},



	// Life cycle

	// Instantiate gallery
	mounted: function () {

		// Swiper config
		// http://idangero.us/swiper/api/
		var options = {

			// loop: true,
			speed: 300,
			direction: 'horizontal',

			// Slides that are in viewport will have additional visible class
			watchSlidesProgress: true,
			watchSlidesVisibility: true,

			// If we need pagination
			slidesPerView: 1,
			centeredSlides: true,
			autoHeight: true,

			// Navigation arrows
			// nextButton: '.view-swiper-button-next',
			// prevButton: '.view-swiper-button-prev',

			// And if we need scrollbar
			// scrollbar: '.view-swiper-scrollbar',

			// Class name of the wrapper element within the container
			wrapperClass: 'swiper-wrapper',

		};

		if (this.paginate) {
			_.merge(options, {

				// HTML
				// Pagination
				pagination: this.$el.findElementsByClassName('.swiper-pagination')[0],
				paginationType: 'bullets',
				// paginationHide: false,
				// paginationElement: 'span',
				// paginationClickable: true,
				paginationBulletRender: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				}

			});
		}


		if (this.options) {
			_.merge(options, this.options);
		}

		this.swiperInstance = new Swiper(this.$el, options);
		this.swiperInstance.update();

	},

	beforeDestroy: function () {
		if (this.swiperInstance) {
			this.swiperInstance.destroy();
		}
	}

};
