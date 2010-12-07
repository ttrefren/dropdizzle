(function($) {
    $.fn.dropdizzle = function() {
        var dropdown = this,
            title = this.children().filter('.title'),
            ul = this.children().filter('ul'),
            title_text = $('<div>').addClass('title_text'),
            title_arrow = $('<div>').addClass('arrow');
        
        title_text.html(title.html());
        title.html(title_text).append(title_arrow);
        
        title.mousedown(function() { ul.toggle(); });
        
        ul.children().filter('li').click(function() {
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            var val = $(this).attr('val') || $(this).text();
            title_text.html($(this).text())
            
            ul.hide();
            dropdown.attr('val', val);
            $(this).trigger('change');
        });
    };
})(jQuery);
