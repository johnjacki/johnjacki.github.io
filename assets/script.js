(function($){
    var countDownDate = new Date("Feb 8, 2024 15:30:00").getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if(days > 0) $('#countdown .data .day h2').html(days);
        else $('#countdown .data .day h2').html('00');
        if(hours > 0) $('#countdown .data .hour h2').html(hours);
        else $('#countdown .data .hour h2').html('00');
        if(minutes > 0) $('#countdown .data .min h2').html(minutes);
        else $('#countdown .data .hour h2').html('00');
    }, 1000);
})(jQuery);