/*
 *Specific site scripts
*/

(function(){

	'use strict';

	// Make the hero height same as the viewport height
	// =====================================================
	var parent = $('#hi');

	// Make the heigth header same as viewport
	parent.css({
		'height': $(window).height() + 'px'
	});

	// And make it persistive
	$(window).resize(function() {
		parent.css({
			'height': $(window).height() + 'px'
		});
	});

})();