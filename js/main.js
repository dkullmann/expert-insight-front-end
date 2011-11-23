$(document).ready(function() {

	var scroller_max = 4;
	
	// expert grid popups
	$(".expert-grid li").hover(function() {
		var tip = $("<div class='tip' />");
		tip.html($(this).html());
		tip.appendTo($(this)).fadeIn('fast');
		$(".expert-grid li").css('zIndex', 0);
		$(this).css('zIndex', 10);
	}, function() {
		$(this).children('.tip').fadeOut('fast', function(){
			$(this).remove();
		});
	});
	
	// all experts scroller
	$(".scroller").each(function() {
		var count = $(".scroller li").length;
		var current = 1;
		// add the buttons
		$("<a class='prev'>Previous</a>")).appendTo($(this)).click(function(){
			$(".scroller ui").css("marginLeft", -= 177);
		})
	});
	
	// experts list
	$("#experts-list").each(function() {
		var tabs = $(this).children('ul');
		var count = tabs.length;
		if (count < 2) { return; }
		// set up controls
		var controls = $("<ol class='controls' />");
		for (var i = 1; i <= count; i++) {
			$("<li />").text(i).appendTo(controls);
		}
		controls.children('li:first-child').addClass('current');
		controls.appendTo($(this).parent());
		// bind 'em
		controls.children('li').click(function() {
			var target = $(tabs[$(this).index()])
			tabs.css('zIndex', 0);
			target.hide().css('zIndex', 1).fadeIn('fast');
			controls.children('li').attr('class', '');
			$(this).addClass('current');
		});
		
	});
	
});