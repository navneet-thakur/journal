$(document).ready(function(){
   // page request handle
    $(function(){
        $("a").click(function(e){
            //code for the link action
            var url = $(this).attr('href');
            $.ajax({url:url+'?mode=ajax',success: function(data){
                $('.main-article').html(data);
            }});
            if(url!=window.location){
                window.history.pushState({path:url},'',url);
            }
            /* Back button behavior change */
            $(window).bind('popstate', function() {
                $.ajax({url:location.pathname+'?mode=ajax',success: function(data){
                    $('.main-article').html(data);
                }});
            });
            return false;
        });
    });
});