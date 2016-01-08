(function ($) {

    function DropdownMenu($container, options) {
        this.options = $.extend($.fn.dropdownMenu.defaults, options || {});
        this.$container = $container;
        this.$toggle = $container.find(this.options.toggleSelector);
        this.$menu = $container.find(this.options.menuSelector);
        this._init();
    }

    DropdownMenu.prototype = {
        constructor: DropdownMenu,
        _init: function () {
            var t = this;
            t.$toggle.click(function (e) {
                e.preventDefault();
                e.stopPropagation();

                t.$container.addClass('pending');
                clearMenu();
                t.$container.removeClass('pending');

                t.$container.hasClass('open') ? t.close() : t.open();
            });
        },
        open: function () {
            this.$container.addClass('open');
            this.$menu.show();
        },
        close: function () {
            this.$container.removeClass('open');
            this.$menu.hide();
        }
    }

    $.fn.dropdownMenu = function (options) {
        this.each(function () {
            var $this = $(this);
            if (!$this.data('DropdownMenu')) {
                $this.data('DropdownMenu', new DropdownMenu($(this), options));
            }
            return $this.data('DropdownMenu');
        });
    }

    $.fn.dropdownMenu.defaults = {
        containerSelector: '.dropdown-menu',
        toggleSelector: '> a',
        menuSelector: '> ul'
    }

    function clearMenu() {
        $($.fn.dropdownMenu.defaults.containerSelector).filter('.open').not('.pending').each(function () {
            var dropdownMenu = $(this).data('DropdownMenu');
            if (dropdownMenu) {
                dropdownMenu.close();
            }
        });
    }

    $(function () {
        $($.fn.dropdownMenu.defaults.containerSelector).dropdownMenu();
        $(document).on('click', function () {
            clearMenu();
        });
    });
})(jQuery);