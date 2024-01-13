(function($){

    $(document).ready(function(){
        var params = new URLSearchParams(window.location.search);
        if(params.has('code')){
            var code = params.get('code');
            if(code == '13579'){
                var seats_str = $('#rsvp .seats').html();
                seats_str = seats_str.replace('[seat_no]','1');
                $('#rsvp .seats').html(seats_str);
                $('#rsvp .seats').removeClass('d-none');
                $('#rsvp form #rsvp').val(1);
            }else if(code == '02468'){
                var seats_str = $('#rsvp .seats').html();
                seats_str = seats_str.replace('[seat_no]','2');
                $('#rsvp .seats').html(seats_str);
                $('#rsvp .seats').removeClass('d-none');
                $('#rsvp form #rsvp').val(2);
            }
        }
        lightbox.option({
            'positionFromTop': 61,
        })
    });
    
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
                    'RSVP':$('#rsvp form #rsvp').val(),
                }},
                function(response, textStatus, jqXHR){
                    $('#rsvp form button[type="submit"]').prop('disabled',false);
                    $('#rsvp form button[type="submit"]').html('Send');

                    if(response.success){
                        $('#rsvp form').prepend('<div class="alert"><div><h2>Thank You</h2><p>Appreciate your prompt response! It wouldn\'t be the same without you. See you there!</p></div></div>');
                    }else{
                        $('#rsvp form').prepend('<div class="alert"><div><h2>Error</h2><p>We are unable to submit your response, please reachout to Jacki or John</p></div></div>');
                    }

                    // reset form fields
                    $('#rsvp form input[type="text"]').val('');
                    $('#rsvp form input[type="email"]').val('');
                    $('#rsvp form textarea').val('');
                    $('#rsvp form input:checked').prop('checked',false);

                    setInterval(function(){
                        $('#rsvp form .alert').remove();
                    },25000);
                }, 'json'
            );
        }catch(e){
            console.log(e);
        }
    });
    $(document).on('click','#rsvp form .alert',function(e){
        $(this).remove();
    });

    // FIXED HEADER
    $(window).on('scroll',function(){
        var wintop = $(this).scrollTop();
        var stickyoffset = $('#hero').offset().top + $('#hero').innerHeight();
        if(wintop > stickyoffset){
            if(!$('header').hasClass('sticky')){
                $('header').addClass('sticky');
            }
        }else{
            if($('header').hasClass('sticky')){
                $('header').removeClass('sticky');
            }
        }
    });

})(jQuery);