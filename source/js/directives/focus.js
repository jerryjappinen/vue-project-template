
// v-focus
V.directives['auto-focus'] = {

	// bind
	// called only once, when the directive is first bound to the element. This is where you can do one-time setup work.

	// inserted
	// called when the bound element has been inserted into its parent node (this only guarantees parent node presence, not necessarily in-document).
	inserted: function (el, binding, vnode) {
		el.focus();
	}

	// update
	// called whenever the bound element’s containing component is updated. The directive’s value may or may not have changed. You can skip unnecessary updates by comparing the binding’s current and old values (see below on hook arguments).

	// componentUpdated
	// called after the containing component has completed an update cycle.

	// unbind
	// called only once, when the directive is unbound from the element.

};
