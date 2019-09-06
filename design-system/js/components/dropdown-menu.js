;

(function (window, $, undefined) {
  var $navItemTrigger = $('.js-dropdown-menu-trigger');
  var $navMenuItems = $('.js-dropdown-menu-item');
  var $navMenuItemsContent = $('.js-dropdown-menu-content');

  BUNN.closeDropdown = function ($menu) {
    if (window.innerWidth < BUNN.screens.md) {
      $menu.slideUp('fast');
    } else {
      $menu.fadeOut('fast');
    }
  };

  BUNN.openDropdown = function ($menu) {
    if (window.innerWidth < BUNN.screens.md) {
      $menu.slideDown('fast');
    } else {
      $menu.fadeIn('fast');
    }
  }; //Trigger on click


  $navItemTrigger.on('click', function (e) {
    var $navMenuItem = $(this).closest('.js-dropdown-menu-item');
    var $openSiblingMenu = $navMenuItem.siblings('.active');
    var $navMenuItemContent = $navMenuItem.find('.js-dropdown-menu-content');
    var $iconContainer = $navMenuItem.find('.js-dropdown-menu-item-icon');
    var iconInactiveState = $iconContainer.data('inactive-icon');
    var iconActiveState = $iconContainer.data('active-icon');
    var $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer);

    if ($navMenuItem.hasClass('active')) {
      $navMenuItem.removeClass('active');
      $icon.removeClass(iconActiveState).addClass(iconInactiveState);
      BUNN.closeDropdown($navMenuItemContent);
    } else {
      console.log($openSiblingMenu.length);
      $navMenuItems.removeClass('active');

      if ($openSiblingMenu.length) {
        var $openSiblingMenuIconContainer = $openSiblingMenu.find('.js-dropdown-menu-item-icon');
        var $openSiblingMenuIcon = $('[class*=fa]', $openSiblingMenuIconContainer).length ? $('[class*=fa]', $openSiblingMenuIconContainer) : $('[data-fa-i2svg]', $openSiblingMenuIconContainer);
        $openSiblingMenuIcon.removeClass(iconActiveState).addClass(iconInactiveState);
      }

      $navMenuItem.addClass('active');
      $icon.removeClass(iconInactiveState).addClass(iconActiveState);
      BUNN.closeDropdown($navMenuItemsContent);
      BUNN.openDropdown($navMenuItemContent);
    }
  });
  $(document).on('mousedown', function (e) {
    var $activeDropdown = $('.js-dropdown-menu-item.open');

    if ($activeDropdown.length && !$(e.target).closest('.js-dropdown-menu-item').length && !$(e.target).closest('.js-drawer').length) {
      var $activeMenuContent = $activeDropdown.find('.js-dropdown-menu-content');
      var $iconContainer = $activeDropdown.find('.js-dropdown-menu-item-icon');
      var iconInactiveState = $iconContainer.data('inactive-icon');
      var iconActiveState = $iconContainer.data('active-icon');
      var $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer);
      $navMenuItems.removeClass('active');
      $icon.removeClass(iconActiveState).addClass(iconInactiveState);
      BUNN.closeDropdown($activeMenuContent);
    }
  });
})(window, jQuery);