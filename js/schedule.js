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
	
	// weekly template
	$('#week .add-block').click(function() {
		var list = $(this).parent().children('ol');
		var clone = list.children('li:first').clone();
		clone.appendTo(list);
	});
	$('#week').delegate('select', 'focus', function(e) {
		var type = $(this).attr('class');
		var day = $(this).closest('ol');
		$('option', this).remove();
		// fill the list
		for (var i=0; i<24; i++) {
			var hr = (i<10) ? '0'+i : i;
			$(this).append("<option value='" + hr + "00'>" + i + ":00</option><option value='" + hr + "30'>" + i + ":30</option>");
		}
		// remove any that are invalid
		var that = this;
		$('li', day).each(function() {
			if (this != $(that).parent()) {
				var from = parseInt($('select.from', this).val());
				var until = parseInt($('select.until', this).val());
				$('option', that).each(function() {
					if (parseInt($(this).attr('val')) > until) {
						return false;
					}
					if (parseInt($(this).attr('val')) >= from) {
						$(this).remove();
					}
				});
			}
						
		});
		
	}).delegate('select', 'change', function(e) {
		// reorder the elements
		var item = $(this).parent();
		var this_time = $('select.from', item).val();
		var before = false;
		$('select.from', item.parent()).each(function() {
			if ($(this).val() > this_time) {
				before = $(this).parent();
				return false;
			}
		});
		if (before) {
			item.insertBefore(before);
		} else {
			item.appendTo(item.parent());
		}
	});
	
	// weekly template (alt)
	var context = 'add';
	$('#week-grid').selectable({
		stop: function() {
			$( ".ui-selected", this ).each(function() {
				if (context == 'add') {
					$(this).addClass('available');
				} else {
					$(this).removeClass('available');
				}
			});
		}
	});
	$('#week-grid li li').click(function() {
		$(this).toggleClass('available');
	});
	$('#template .controls a').click(function() {
		$('#template .controls a').removeClass('active');
		context = $(this).attr('class');
		$(this).addClass('active');
	});
	
	
});