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

    // RSVP
    $(document).on('submit','#rsvp form',function(e){
        e.preventDefault();
        try{
            $.get('https://script.google.com/macros/s/AKfycbzAM71-JdtQ-GfMHccgOoPQp61tXF0L7tPQIlEIk2SPYlWpbHV7o_Vnqcmc1ngrQsL-/exec',
                {data:JSON.stringify({
                    'First Name':$('#rsvp form input[name="fname"]').val(),
                    'Last Name':$('#rsvp form input[name="lname"]').val(),
                    'Email':$('#rsvp form input[name="email"]').val(),
                    'Contact Number':$('#rsvp form input[name="phone"]').val(),
                    'Will you be able to attend our wedding?':$('#rsvp form input[name="going"]:checked').val(),
                    'Message to the Bride & Groom':$('#rsvp form #message').val(),
                })},
                function(response, textStatus, jqXHR){
                    if(response.success){
                        console.log('Your RSVP is submitted');
                    }else{
                        console.log('Unable to submit RSVP');
                    }
                }
            );
        }catch(e){
            console.log(e);
        }
        
    });
})(jQuery);