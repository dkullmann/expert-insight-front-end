var base_slot = 15;

function sortTime(time, dur) {
	var hours = time.substr(0,2);
	var mins = time.substr(2,2);
	if (typeof(dur) !== 'undefined') {
		mins = parseInt(mins) + parseInt(dur);
		if (mins >= 60) {
			hours = parseFloat(hours) + Math.floor(mins / 60);
			mins = mins % 60;
		}
	}
	mins += '';
	mins = (mins.length == 1) ? '0' + mins : mins;
	return hours + '.' + mins;
}

function updateSummary() {
	
	// get values
	var date = $.datepicker.formatDate('mm-dd-yy', $('.datepicker').datepicker("getDate"));
	var time =  $('.step3 option:selected').val();
	var dur = $('.step1 option:selected').val();
	var rate = $('input[name=rate]').val();
	var cost = (dur / base_slot) * rate;
		
	// output everything
	$('.summary .date span').replaceWith('<span>' + date + '</span>');
	$('.summary .time span').replaceWith('<span>' + sortTime(time) + ' - ' + sortTime(time, dur) + '</span>');
	$('.summary .cost span').replaceWith('<span>$' + cost + '</span>');
	$('.summary button').removeAttr('disabled');
	 
}

$(document).ready(function() {
	
	// init date picker
	$('.datepicker').datepicker({
		showOtherMonths:true,
		nextText: '>',
		prevText: '<' ,
		minDate: new Date(),
		onSelect: function(dateText, inst) {
			// ajax call here
			updateSummary();
			
		}
	});
	
	// select elements 
	$('select').change(updateSummary);
	
});