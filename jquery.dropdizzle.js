(function($) {
    function ce(e) {
        return $(document.createElement(e));
    }
    
    function is_array(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
    
    var blur_flags = {};
    
    function Dropdown(div, items) {
        this.name = div[0].id;
        console.log(div)
        this.wrapper = div.addClass('dropdizzle');
        this.title = ce('div').addClass('title').attr('tabindex', 0);
        this.items = new Items(items);
        this.title_text = ce('div').addClass('title_text').html(div.text());
        
        this.title.html(this.title_text).append(ce('div').addClass('arrow'));  
        this.wrapper.html('').append(this.title).append(this.items.ul);
        
        this.blur_flag = null;
        this.bindings();
        return this;
    }
    
    Dropdown.prototype.bindings = function() {
        var that = this;
        this.wrapper.bind('selected', function(action) {
            var li = $(action.target),
                val = li.attr('val') || li.text();
            
            li.siblings().removeClass('selected');
            li.addClass('selected');
            
            that.title_text.html(li.text())
            that.wrapper.attr('val', val);
            that.items.hide();
            that.items.blur();
            that.wrapper.trigger('change');
        });
        
        this.title.bind('focus', function() {
            that.debug('title focus')
            that.items.focus();
            clearTimeout(that.blur_flag);
        });
        
        this.title.mousedown(function() { 
            that.debug('title mousedown')
            clearTimeout(that.blur_flag);
            if (!that.items.visible()) {
                that.items.show();
                that.items.focus();
            } else {
                that.items.hide();
            }
        });
        
        this.items.ul.blur(function() {
            that.debug('on blur!')
            that.blur_flag = setTimeout(function() {
                that.items.hide();
            }, 75);
        });
        
        this.items.ul.focus(function() {
            that.debug('on focus!')
        });
    };
    
    Dropdown.prototype.debug = function(message) {
        console.log(this.name + ' | ' + message);
    }
    
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
