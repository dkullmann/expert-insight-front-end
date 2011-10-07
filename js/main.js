$(document).ready(function() {
	
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
	
	
});