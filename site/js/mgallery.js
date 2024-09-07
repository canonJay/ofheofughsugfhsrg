jQuery.fn.mgallery = function( options )
{



	var settings = $.extend({
		maxcount : 4
	}, options );;

	var methods =
	{
		//== INIT ==
		init: function( e_this )
		{
			settings._this = e_this;
			
			
			
			var _images_count = $('.m_item',e_this).length;
			$('.m_item:eq(0)',e_this).addClass('current');

			if (_images_count > settings.maxcount) _images_count = settings.maxcount;
			
			if (_images_count <2) return;
			settings._height = $(e_this).height();
			$(e_this).height(settings._height);
	//		$(e_this).attr('height',settings._height+'px');
			settings._width = $(e_this).width();
			$(e_this).width(settings._width);
	//		$(e_this).attr('width',settings._width+'px');
			
			$(e_this).append("<div class='indicators'></div>");
			for (i=0;i<_images_count;i++) $(".indicators",e_this).append("<span class='indicator'></span>");
			
			
			$(".indicators",e_this).hover(function(){},function(){
				$('.m_item',e_this).removeClass('current');
				$('.m_item:eq(0)',e_this).addClass('current');
			});
			
			$(".indicator",e_this).hover(function(){
				var _parent = $(this).closest('.indicators');
				var _index = $('.indicator',_parent).index(this);
				$('.m_item',e_this).removeClass('current');
				$('.m_item:eq('+_index+')',e_this).addClass('current');
			});
			
			$(".indicator",e_this).click(function(){
				var _parent = $(this).closest('.mgallery');
				var _index = $('.indicator',_parent).index(this);
				$('.m_item:eq('+_index+')',e_this).click();
				return false;
			});
			
			
			
			
			$(window).bind('resize', function() {
				$(settings._this).height("auto");
				$(settings._this).width("auto");
				
				
				$(settings._this).height($('.m_item:eq(0) img',settings._this).height());
				
				
			});

			
			
			
			
			
		},
		init_load: function(e_this)
		{
			if ($('.m_item:eq(0) img',e_this).get(0).complete || $('.m_item:eq(0) img',e_this).get(0).readyState === 4) {$(e_this).height($('.m_item:eq(0) img',e_this).height());}

			$('.m_item:eq(0) img',e_this).on("load",function(){
				$(e_this).height($(this).height());
			});
/*
			$(window).on("load",function(){
				var _heigth = $('.m_item:eq(0)',e_this).height();
				$(e_this).height(_heigth);


			});*/
		},
		resize: function( e_this ) {

			$(window).resize(function(){
				var _heigth = $('.m_item:eq(0) img',e_this).height();
				console.log(_heigth);
				var _parent = $(this).closest(".mgallery");
				$(_parent).height(_heigth);
			});
		}

	};//end_ var_ methods


	if (this.length>1)
	{
		return this.each(function()
		{
			$(this).mgallery( options );
		});//end_ func_ each
	}else
	{
		return this.each(function()
		{
			if ($(this).hasClass("_init")) return;
			$(this).addClass("_init");
			methods.init_load(this);
			methods.init(this);
		});//end_ func_ each			
	}//end_ if

};//end_ func_ simpleslider
