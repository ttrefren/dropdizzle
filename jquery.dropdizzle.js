(function($) {
    /*
        Dropdizzle - a jQuery plugin for making stylable dropdown menus.
        (c) Tim Trefren
            Mixpanel, Inc.
            
        issues:
            dynamic width setting does not revert to original after being widened
    
    */
    function ce(e) {
        return $(document.createElement(e));
    }
    
    function is_array(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
        
    function Dropdown(div, items) {
        this.wrapper = div.addClass('dropdizzle');
        this.title = ce('div').addClass('title').attr('tabindex', 0);
        this.items = new Items(items);
        this.title_text = ce('div').addClass('title_text').html(div.text());
        
        this.title.html(this.title_text).append(ce('div').addClass('arrow'));  
        this.wrapper.html('').append(this.title).append(this.items.ul);
        
        this.bindings();
        this.styles();
        return this;
    }
    
    Dropdown.prototype.bindings = function() {
        var that = this;
        
        // Catch 'selected' event fired on item click
        this.wrapper.bind('selected', function(action) {
            var li = $(action.target),
                val = li.attr('val') || li.text();
            
            li.siblings().removeClass('selected');
            li.addClass('selected');
            
            that.title_text.html(li.text())
            that.wrapper.attr('val', val);
            that.styles();
            
            that.items.hide();
            that.items.blur();
            
            // Fire a 'change' event to listen for, on 
            // the main dropdown div
            that.wrapper.trigger('change');
        });
        
        this.title.bind('focus', function() {
            that.items.focus();
        });
        
        this.title.mousedown(function() { 
            that.items.toggle();
        });
        
        this.items.ul.blur(function() {
            that.items.hide();
        });
    };
    
    Dropdown.prototype.styles = function() {
        // Dynamically figure out the width of the dropdown 
        var ul_width = Math.max(this.title.innerWidth(), this.items.ul.innerWidth())
        this.items.ul.css({ 'width': '' + ul_width + 'px'});
    };
    
    function Items(item_list) {
        this.ul = ce('ul').attr('tabindex', 0);
        
        for (var i=0; i < item_list.length; i++) {
            this.ul.append(new Item(item_list[i]));
        }
    }
    
    Items.prototype.toggle = function() {
        this.ul.toggle();
    };
    
    Items.prototype.hide = function() {
        this.ul.hide();
    };
    
    Items.prototype.show = function() {
        this.ul.show();
    };
    
    Items.prototype.visible = function() {
        return this.ul.is(":visible");
    };
    
    Items.prototype.focus = function() {
        this.ul.focus();
    };
    
    Items.prototype.blur = function() {
        this.ul.blur();
    };
    
    function Item(item) {
        var li = ce('li');
        
        if (is_array(item)) {
            li.attr('val', item[0]);
            li.html(item[1]);
        } else {
            li.html(item);
        }
        li.click(function() {
            li.trigger('selected');
        });
        return li;
    }
    
    $.fn.dropdizzle = function(items) {
        var dropdown = new Dropdown(this, items);
        return this;
    };
})(jQuery);
