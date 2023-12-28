(function($){
    // COUNTDOWN
    $('#countdown').countdown('2024/02/08 15:30:00').on('update.countdown', function(event) {
        if(event.offset.totalDays > 0)
            $('#countdown .data .day h2').html(event.offset.totalDays.toString().padStart(2, '0'));
        else
            $('#countdown .data .day h2').html('00');
        if(event.offset.totalHours > 0)
            $('#countdown .data .hour h2').html(event.offset.hours.toString().padStart(2, '0'));
        else
            $('#countdown .data .hour h2').html('00');
        if(event.offset.totalMinutes > 0)
            $('#countdown .data .min h2').html(event.offset.minutes.toString().padStart(2, '0'));
        else
            $('#countdown .data .min h2').html('00');    
    }).on('finish.countdown', function(event) {
        $('#countdown .data .day h2').html('00');
        $('#countdown .data .hour h2').html('00');
        $('#countdown .data .min h2').html('00');
    });
})(jQuery);