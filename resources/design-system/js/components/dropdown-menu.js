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
        e.preventDefault();

        var $navMenuItem = $(this).closest('.js-dropdown-menu-item');
        var $navMenuItemContent = $navMenuItem.find('.js-dropdown-menu-content');

        if ($navMenuItem.hasClass('active')) {
            $navMenuItem.removeClass('active');
            BUNN.closeDropdown($navMenuItemContent);
        } else {
            $navMenuItems.removeClass('active');            
            $navMenuItem.addClass('active');

            BUNN.closeDropdown($navMenuItemsContent);
            BUNN.openDropdown($navMenuItemContent);
        }
    });

    $(document).on('mousedown', function(e) {
        var $activeDropdown = $('.js-dropdown-menu-item.active');

        if ($activeDropdown.length &&
            e.target.closest('.js-dropdown-menu-item') == null &&
            e.target.closest('.js-drawer') == null
        ) {
            var $activeMenuContent = $activeDropdown.find('.js-dropdown-menu-content');
            $navMenuItems.removeClass('active');
            BUNN.closeDropdown($activeMenuContent);
        }
    });
})(window, jQuery);
