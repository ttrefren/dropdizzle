(function($) {
    function ce(e) {
        return $(document.createElement(e));
    }
    function is_array(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
    
    function Hover(div, items) {
        this.div = div.addClass('hoverizzle');
        this.wrapper = ce('div').addClass('wrapper')
        this.label = ce('div').addClass('label');
        this.items = new Items(items);
        this.label_text = ce('div').addClass('label_text').html(div.text());
        
        this.label.html(this.label_text).append(ce('div').addClass('arrow'));  
        this.div.html(this.wrapper.html('').append(this.label).append(this.items.ul));

        this.bindings();
        // this.styles();

		if (this.div.attr('val') === undefined) {
			this.div.attr('val', '');
		}

        return this;    
    }
    
    Hover.prototype.bindings = function() {
        var that = this;
        this.div.mouseenter(function() { 
            that.items.ul.show();
        }).mouseleave(function() {
            that.items.ul.hide();
        });
    };
    
    Hover.prototype.styles = function() {
        var ul_width = Math.max(this.label.innerWidth(), this.items.ul.innerWidth());
        this.items.ul.css({ 'width': '' + ul_width + 'px'});
    };
    
    function Items(items) {
        this.ul = ce('ul');
        
        for (var i=0; i < items.length; i++) {
            this.ul.append(new Item(items[i]));
        }
    }
    
    function Item(item) {
        var li = ce('li');
        
        if (is_array(item)) {
            li.attr('val', item[0]);
            li.html(item[1]);
        } else {
            li.attr('val', item);
            li.html(item);
        }
        li.click(function() {
            li.trigger('selected');
        });
        return li;
    }
    
    $.fn.hoverizzle = function(items) {
        return new Hover(this, items);
    }
})(jQuery);