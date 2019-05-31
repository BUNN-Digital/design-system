;(function(window, $, undefined) {
    var $navItemTrigger = $('.js-dropdown-menu-trigger');
    var $navMenuItems = $('.js-dropdown-menu-item');
    var $navMenuItemsContent = $('.js-dropdown-menu-content');

    BUNN.closeDropdown = function($menu) {
        if (window.innerWidth < BUNN.screens.lg) {
            $menu.slideUp('fast');
        } else {
            $menu.fadeOut('fast');
        }
    };

    BUNN.openDropdown = function($menu) {
        if (window.innerWidth < BUNN.screens.lg) {
            $menu.slideDown('fast');
        } else {
            $menu.fadeIn('fast');
        }
    };

    //Trigger on click
    $navItemTrigger.on('click', function(e) {
        var $navMenuItem = $(this).closest('.js-dropdown-menu-item');
        var $navMenuItemContent = $navMenuItem.find('.js-dropdown-menu-content');

        if ($navMenuItem.hasClass('open')) {
            $navMenuItem.removeClass('open');
            BUNN.closeDropdown($navMenuItemContent);
        } else {
            $navMenuItems.removeClass('open');            
            $navMenuItem.addClass('open');

            BUNN.closeDropdown($navMenuItemsContent);
            BUNN.openDropdown($navMenuItemContent);
        }
    });

    $(document).on('mousedown', function(e) {
        var $activeDropdown = $('.js-dropdown-menu-item.open');

        if ($activeDropdown.length &&
            e.target.closest('.js-dropdown-menu-item') == null &&
            e.target.closest('.js-drawer') == null
        ) {
            var $activeMenuContent = $activeDropdown.find('.js-dropdown-menu-content');
            $navMenuItems.removeClass('open');
            BUNN.closeDropdown($activeMenuContent);
        }
    });
})(window, jQuery);
