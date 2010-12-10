(function($) {
    
    function ce(e) {
        return $(document.createElement(e));
    }
    
    function is_array(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
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
    
    function Items(items) {
        this.ul = ce('ul');
        
        for (var i=0; i < items.length; i++) {
            this.ul.append(new Item(items[i]));
        }
    }
    
    function Hover(div, items, config) {
        this.div = div.addClass('hoverizzle');
        this.wrapper = ce('div').addClass('wrapper');
        this.label = ce('div').addClass('label');
        this.items = new Items(items);
        this.label_text = ce('div').addClass('label_text').html(div.text());
        
        this.label.html(this.label_text).append(ce('div').addClass('arrow'));  
        this.div.html(this.wrapper.html('').append(this.label).append(this.items.ul));
        this.config = $.extend({}, {
                selected: false,
                change_title: false
            }, config || {});

        this.bindings();
        // this.styles();

		if (this.config.selected) {
			this.onselect(this.items.ul.find('[val="' +  this.config.selected + '"]'), false);
		}
		
		if (this.div.attr('val') === undefined) {
			this.div.attr('val', '');
		}

        return this;    
    }
    
    Hover.prototype.onselect = function(target, change) {
		var li = $(target),
			val = li.attr('val'),
			prev_val = this.div.attr('val');

		li.siblings().removeClass('selected');
		li.addClass('selected');

        if (this.config.change_title) {
            this.label_text.html(li.text());
        }
        
		this.div.attr('val', val);
        // this.styles();
		
		if (change && (prev_val != val)) {
            // Fire a 'change' event to listen for, on 
            // the main hover div
            this.div.trigger('change');
		}
	};
	
    Hover.prototype.bindings = function() {
        var that = this;
        this.div.mouseenter(function() { 
            that.items.ul.show();
        }).mouseleave(function() {
            that.items.ul.hide();
        });
        
        // Catch 'selected' event fired on item click
        this.div.bind('selected', function(action) {
            that.onselect(action.target, true); 
            that.items.ul.hide();
        });
    };
    
    Hover.prototype.styles = function() {
        var ul_width = Math.max(this.label.innerWidth(), this.items.ul.innerWidth());
        this.items.ul.css({ 'width': '' + ul_width + 'px'});
    };
    
    $.fn.hoverizzle = function(items, config) {
        return new Hover(this, items, config);
    };
})(jQuery);