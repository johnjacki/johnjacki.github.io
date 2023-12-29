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
        $('#rsvp form button[type="submit"]').prop('disabled',true);
        $('#rsvp form button[type="submit"]').html('<img src="images/loader.gif" width="16" height="16"/>');
        try{
            $.get('https://script.google.com/macros/s/AKfycbwwfiCs9Te5zZNx6hNi8FIujCoDyosgRQi8M1PzcSZlSJg1bEA61hf8iwMEkgsfU2bH/exec',
                {data:{
                    'First Name':$('#rsvp form input[name="fname"]').val(),
                    'Last Name':$('#rsvp form input[name="lname"]').val(),
                    'Email':$('#rsvp form input[name="email"]').val(),
                    'Contact Number':$('#rsvp form input[name="phone"]').val(),
                    'Will you be able to attend our wedding?':$('#rsvp form input[name="going"]:checked').val(),
                    'Message to the Bride & Groom':$('#rsvp form #message').val(),
                }},
                function(response, textStatus, jqXHR){
                    $('#rsvp form button[type="submit"]').prop('disabled',false);
                    $('#rsvp form button[type="submit"]').html('Send');
                    
                    if(response.success){
                        $('#rsvp form').prepend("<p class='alert alert-success'>Thank you for sending your response</p>")
                    }else{
                        $('#rsvp form').prepend("<p class='alert alert-danger'>We are unable to reserve your seat, please contact John or Jacki</p>")
                    }
                    setInterval(function(){
                        $('#rsvp form .alert').remove();
                    },10000);
                }, 'json'
            );
        }catch(e){
            console.log(e);
        }
    });
})(jQuery);