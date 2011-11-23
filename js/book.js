$(document).ready(function() {
	
	// init date picker
	$('.date-picker').datepicker({
		showOtherMonths:true,
		nextText: '>',
		prevText: '<' ,
		minDate: new Date(),
		onSelect: function(dateText, inst) {
			// ajax call here
			$('.summary .date span').replaceWith('<span>' + dateText + '</span>');
		}
	});
	
});