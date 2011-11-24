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
	
	// datepickers
	var start_end = $('#start-date, #end-date').datepicker({
		showOtherMonths:true,
		nextText: '>',
		prevText: '<',
		onSelect: function(selectedDate) {
			var option = this.id == "start-date" ? "minDate" : "maxDate",
				instance = $(this).data("datepicker"),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings);
			start_end.not(this).datepicker("option", option, date);
			// does button need to change?
			$('button.suspend').attr('disabled',' disabled');
			if ($('#start-date').val() && $('#end-date').val()) {
				$('button.suspend').removeAttr('disabled');
			}
		}
	});
	
	// add suspension block
	$('#suspensions button.suspend').click(function(e) {
		if (!$('#start-date').val() || !$('#end-date').val()) {
			return false;
		}
		var start = "<time pubdate=''>" + $('#start-date').val() + "</time>";
		var end = "<time pubdate=''>" + $('#end-date').val() + "</time>";
		var li = $("<li><span>" + start + " - " + end + "</span></li>");
		li.append("<a class='delete'>delete</a>");
		$(li).appendTo('#suspensions ol').hide().fadeIn(100);
		$('#suspensions li.none').remove();
		$('#start-date, #end-date').val('');
		$(this).removeAttr('disabled');
		e.preventDefault();
	})
	
	// remove suspension block
	$('#suspensions a.delete').live('click', function(e) {
		$(this).parent().fadeOut(100, function() {
			$(this).remove();
			if (!$('#suspensions li').length) {
				$('#suspensions ol').append("<li class='none'>No suspensions currently scheduled!</li>").hide().fadeIn(100);
			}
		});
		e.preventDefault();
	});
	
});