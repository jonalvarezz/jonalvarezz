(function($){
	var header = $('header');

	// Make the heigth header same as viewport
	header.css({
		'height': $(window).height() + 'px'
	});

	// And make it persistive
	$(window).resize(function() {
		header.css({
			'height': $(window).height() + 'px'
		});
	});

}(jQuery));