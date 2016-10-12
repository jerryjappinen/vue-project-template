
# Libraries

## Interact.js

```js
// target elements with the "draggable" class
interact('.draggable')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		// enable autoScroll
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
		// call this function on every dragend event
		onend: function (event) {
			var textEl = event.target.querySelector('p');

			textEl && (textEl.textContent =
				'moved a distance of '
				+ (Math.sqrt(event.dx * event.dx +
										 event.dy * event.dy)|0) + 'px');
		}
	});

function dragMoveListener (event) {
var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

// translate the element
target.style.webkitTransform =
target.style.transform =
	'translate(' + x + 'px, ' + y + 'px)';

// update the posiion attributes
target.setAttribute('data-x', x);
target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
```

## Swiper

```js
// Later add callback
self.swiper.on('slideChangeStart', function () {
	console.log('slide change start');
});

// Add one more handler for this event
self.swiper.on('slideChangeStart', function () {
	console.log('slide change start 2');
});

// Add handler that will be executed only once
self.swiper.once('sliderMove', function () {
	console.log('slider moved');
});

// Somewhen later, remove all slideChangeStart handlers
self.swiper.off('slideChangeStart');

Detach or reattach all event listeners
self.swiper.detachEvents();
self.swiper.attachEvents();

Add or remove slides
self.swiper.prependSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
self.swiper.appendSlide([
	'<span></span>',
	'<span></span>'
]);
``



# Knockout

## Dispose of event handler when view is removed

```js
ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	jQuery(window).off('keydown', handler);
});
```
