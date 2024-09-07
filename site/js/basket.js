
function _init_basket()
{
	console.log("_init_basket");
	$(".btn_basket").on("animationend",function(){
		$(this).removeClass("add");
	});


	$(document).on("click",".quantity_control .minus",function(){
		_parent = $(this).closest(".quantity_control");
		_input = $("input",_parent);
		if ($(_input).val() > 1)
		{
			$(_input).val(parseInt($(_input).val())-1);
			console.log($(_input).val());
			if ($(_parent).hasClass("auto"))
			{
				_basketid = $(_parent).attr("data-basketid");
				_basket[_basketid]["count"] = $(_input).val();
				_basket_refresh();
			}
		}
	});
	$(document).on("click",".quantity_control .plus",function(){
		_parent = $(this).closest(".quantity_control");
		_input = $("input",_parent);
		if ($(_input).val() < $(_input).attr("maxlength") || typeof $(_input).attr("maxlength") == "undefined")
		{
			$(_input).val(parseInt($(_input).val())+1);
			console.log($(_input).val());
			if ($(_parent).hasClass("auto"))
			{
				_basketid = $(_parent).attr("data-basketid");
				_basket[_basketid]["count"] = $(_input).val();
				_basket_refresh();
			}
		}
	});
	
	$(document).on("click",".to_basket",function(){
		_target = $(this).attr("href");
		_set_basket(_target);
		return false;
	});
	
	$(document).on("click",".del_from_basket",function(){
		_target = $(this).attr("href");
		_basketid = $(_target).attr("data-basketid");
		
		if (typeof _basket[_basketid] != "undefined") delete _basket[_basketid];
		_basket_refresh();
		return false;
	});
	
	
	$(document).on("basket_refresh",function(){
		
		if ($(".basket_container").length > 0)
		{
			$.get("/site.php?module=parts/site.basket&ajax=1",function(data){
				_result = $.parseJSON(data);
		//		console.log(_result);
				$(".refresh_content").html(_result["html"]);
			});
		}
		
	});
	
	
}

function _set_basket(_parent)
{
	_basketid = $(_parent).attr("data-basketid");
	_input = $("input",_parent);
	if (typeof _basket[_basketid] == "undefined") _basket[_basketid] = {count : 0};
	
	if ($(_parent).hasClass("add"))
		_basket[_basketid]["count"] = parseInt(_basket[_basketid]["count"]) + parseInt($(_input).val());
	else
		_basket[_basketid]["count"] = $(_input).val();
	
	_basket_refresh();

}

function _basket_refresh()
{
	console.log(_basket);
	$.cookie("rg_rem_parts_basket", JSON.stringify(_basket),{expires: 10,path: '/'});
	
	$(".btn_basket").addClass("add");
	_count = 0;
	if (Object.keys(_basket).length > 0)
		for (i in _basket) _count += parseInt(_basket[i]["count"]);
	$(".btn_basket .count").text(_count);
			
	$(document).trigger("basket_refresh");
	/*
	$.get("/site.php?module=basket/site.list&getbasket=1",function(data){
		$(".cart-section").html(data);
		if ($(".cart-product-q").length == 0)
		{
			$(".cart-products-num").html(0);
			$(".cart-price").html(0);

		}
		else
		{
			$(".cart-products-num").html($(".cart-product-q span").text());
			$(".cart-price").html(cost3($(".cart-product-q span").attr("data-basketprice")));
		}
		
	});
	
*/

}


$(function(){
	if (typeof $.cookie("rg_rem_parts_basket") == "undefined" || $.cookie("rg_rem_parts_basket") == "[]") _basket = {}; else _basket = JSON.parse($.cookie("rg_rem_parts_basket"));
	console.log(typeof _basket);
	if (_basket == []) _basket = {};
	console.log(_basket);
	_init_basket();
});


