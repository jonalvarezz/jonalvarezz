/*
 *Specific site scripts
*/

(function(){

	'use strict';

	var $window   = $(window),
	    $document = $(document),
	    $html     = $(document.documentElement),
	    $body     = $(document.body),
	    $surface  = $body,
	    $content  = $('.content', $surface);
 
	// Smooth scrolling for same page anchors
	// =====================================================
    $document.on('click', 'a[href^=#]:not([href=#])', function(e) {
      e.preventDefault();
 
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $surface.animate({
          scrollTop: target.offset().top
        }, 500);
        location.hash = this.hash;
        return false;
      }
    });
 
    // Fix oveflow-scrolling on iOS7
    $surface.on('touchstart', function(e) {});


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