var as_gridView;

;(function( $ ) {

	as_gridView = (function() {
		var gridWrapper,
			triggerDrop;

		var init = function() {
			var tempBuffer = $('.form-cmp__dropdown');

			gridWrapper = $('.products__grid');
			triggerDrop = tempBuffer.find('.form-cmp__dropdown-selected-val');
			dropDown    = tempBuffer.find('.form-cmp__dropdown-list');

			_events()
		};

		var _events = function() {
			triggerDrop.on( 'click', _triggerMenu );
			dropDown.on( 'click', '.form-cmp__dropdown-link', _chooseView );
		};

		var _triggerMenu = function( e ) {
			var $this = $( this );

			e.preventDefault();

			$this.siblings('.form-cmp__dropdown-list').stop( true, true ).slideToggle( 250 );
		};

		var _chooseView = function( e ) {
			var $this    = $( this ),
				linkText = $this.text();

			e.preventDefault();

			$this
				.parent()
				.addClass('form-cmp__dropdown-item_active')
				.siblings('.form-cmp__dropdown-item')
				.removeClass('form-cmp__dropdown-item_active');

			_changeGridView( $.trim( linkText ) );

			triggerDrop
						.trigger('click')
						.text( linkText );
		};

		var _changeGridView = function( type ) {
			var type = type || 'Линиями';

			switch( type.toLowerCase() ) {
				case 'линиями':
				default:
					gridWrapper.removeClass('products__grid_cols');
					break;

				case 'сеткой':
					gridWrapper.addClass('products__grid_cols');
					break
			}
		};

		
		return {
			init : init
		};
	})();

})( jQuery );