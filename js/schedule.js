$(document).ready(function() {
	
	// set up tabs
	$('.create-schedule section').hide().filter(':first').show();
	$('.create-schedule .tabs a').click(function(e) {
		if ($(this).parent().hasClass('current')) {
			return false;
		}
		// show the right tab
		var to_show = this.hash;
		console.log(to_show);
		$('.create-schedule section:visible').hide();
		$(to_show).show();
		// change tab styling
		$('.create-schedule .tabs li').removeClass('current');
		$(this).parent().addClass('current');
		e.preventDefault();
	});
	
});