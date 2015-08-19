var as_toTop;

;(function( $ ) {

	as_toTop = (function() {
		var $document,
			scrollParent,
			topBtn,
			offsetTrig,
			footer;

		var init = function() {
			$document    = $(document);
			scrollParent = $('html, body');
			topBtn       = $('.push-top');
			footerHeight = $('.footer').height() + 35;
			offsetTrig   = $document.height() / 8;

			_events()
		};

		var _events = function() {
			topBtn.on( 'click', _goToTop );
			$( window ).on('scroll', _fixUpTotop );
		};

		var _goToTop = function( e ) {
			e.preventDefault();

			scrollParent.animate({
				scrollTop : 0
			}, 500);
		};

		var _fixUpTotop = function( e ) {
			var $this      = $( this ),
				fromBottom = $document.height() - $this.scrollTop() - $this.height();

			if( offsetTrig <= $this.scrollTop() ) {
				topBtn.removeClass('push-top_hidden');
			} else {
				topBtn.addClass('push-top_hidden');
			}

			if( fromBottom <= footerHeight ) {
				topBtn.removeClass('push-top_fixed');
			} else {
				topBtn.addClass('push-top_fixed');
			}

			/*startCondit !== isDown && _classChangeUpToTop();

			if( fromBottom <= footer.outerHeight() && topBtn.parent().hasClass('fixed') ) {
				topBtn.parent().removeClass('fixed');
			} else if( fromBottom > footer.outerHeight() && !topBtn.parent().hasClass('fixed') ) {
				topBtn.parent().addClass('fixed');
			}*/
		};

		var _classChangeUpToTop = function() {
			isDown ? topBtn.parent().removeClass('hidden') : topBtn.parent().addClass('hidden');
		};

		

		var _eventsSlider = function() {
			slides = slider.find('.kwc_header-slider-slides');

			slides.owlCarousel({
				items              : 1,
				autoplay           : true,
				autoplayTimeout    : 5000,
				autoplaySpeed      : 1000,
				autoplayHoverPause : true,
				loop               : true
			});

			slider.on('click', '.kwc_header-slider-slides_name-link', _navMainSlider );
			slider.on('mouseover mouseout', _checkAutoplay )
				  .find('.kwc_header-slider-arr')
				  .on('click','a', _arrowMainSlider);


			slides.on('changed.owl.carousel', _eventsMainSlider);
		};

		var _checkAutoplay = function( e ) {
			switch( e.type ) {
				case 'mouseover':
					slides.trigger('stop.owl.autoplay');
					break;

				case 'mouseout':
				default:
					slides.trigger('play.owl.autoplay');
					break;
			}
		};

		var _arrowMainSlider = function( e ) {
			var dir = this.hash.substr(1);

			e.preventDefault();

			dir === 'prev' ? slides.trigger('prev.owl.carousel') : slides.trigger('next.owl.carousel');
		};

		var _navMainSlider = function( e ) {
			var goToIndex = $( this ).closest('.kwc_header-slider-slides_name-item').index();

			e.preventDefault();

			_navMainSliderGo( goToIndex );
			slides.trigger('to.owl.carousel', goToIndex );
		};

		var _navMainSliderGo = function( slideNum ) {
			var slideNum = slideNum || 0;

			slider.find('.kwc_header-slider-slides_name .kwc_header-slider-slides_name-item')
					   .eq( slideNum )
					   .addClass('active')
					   .siblings('.kwc_header-slider-slides_name-item')
					   .removeClass('active');
		};

		var _eventsMainSlider = function( e ) {
			_navMainSliderGo( e.page.index );
		};

		var _eventsHead = function() {
			headMenu.on('click', '.kwc_header-mobile_toggle', _toggleMobileMenu );
		};

		var _toggleMobileMenu = function( e ) {
			e.preventDefault();

			$( this ).siblings('.kwc_header-mobile-nav').toggle();
		};

		return {
			init : init
		};
	})();

})( jQuery );