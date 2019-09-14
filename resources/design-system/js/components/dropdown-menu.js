;(function (BUNN, $, undefined) {
  const $navItemTrigger = $('.js-dropdown-menu-trigger')
  const $navMenuItems = $('.js-dropdown-menu-item')
  const $navMenuItemsContent = $('.js-dropdown-menu-content')

  BUNN.closeDropdown = $menu => {
    if (window.innerWidth < BUNN.screens.md) {
      $menu.slideUp('fast')
    } else {
      $menu.fadeOut('fast')
    }
  }

  BUNN.openDropdown = $menu => {
    if (window.innerWidth < BUNN.screens.md) {
      $menu.slideDown('fast')
    } else {
      $menu.fadeIn('fast')
    }
  }

  // Trigger on click
  $navItemTrigger.on('click', function (e) {
    const $navMenuItem = $(this).closest('.js-dropdown-menu-item')
    const $openSiblingMenu = $navMenuItem.siblings('.active')
    const $navMenuItemContent = $navMenuItem.find('.js-dropdown-menu-content')
    const $iconContainer = $navMenuItem.find('.js-dropdown-menu-item-icon')
    const iconInactiveState = $iconContainer.data('inactive-icon')
    const iconActiveState = $iconContainer.data('active-icon')

    const $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer)

    if ($navMenuItem.hasClass('active')) {
      $navMenuItem.removeClass('active')
      $icon.removeClass(iconActiveState).addClass(iconInactiveState)

      BUNN.closeDropdown($navMenuItemContent)
    } else {
      $navMenuItems.removeClass('active')

      if ($openSiblingMenu.length) {
        const $openSiblingMenuIconContainer = $openSiblingMenu.find('.js-dropdown-menu-item-icon')
        const $openSiblingMenuIcon = $('[class*=fa]', $openSiblingMenuIconContainer).length ? $('[class*=fa]', $openSiblingMenuIconContainer) : $('[data-fa-i2svg]', $openSiblingMenuIconContainer)
        $openSiblingMenuIcon.removeClass(iconActiveState).addClass(iconInactiveState)
      }

      $navMenuItem.addClass('active')
      $icon.removeClass(iconInactiveState).addClass(iconActiveState)

      BUNN.closeDropdown($navMenuItemsContent)
      BUNN.openDropdown($navMenuItemContent)
    }
  })

  $(document).on('mousedown', function (e) {
    const $activeDropdown = $('.js-dropdown-menu-item.active')

    if ($activeDropdown.length &&
            !$(e.target).closest('.js-dropdown-menu-item').length &&
            !$(e.target).closest('.js-drawer').length
    ) {
      const $activeMenuContent = $activeDropdown.find('.js-dropdown-menu-content')
      const $iconContainer = $activeDropdown.find('.js-dropdown-menu-item-icon')
      const iconInactiveState = $iconContainer.data('inactive-icon')
      const iconActiveState = $iconContainer.data('active-icon')

      const $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer)

      $navMenuItems.removeClass('active')
      $icon.removeClass(iconActiveState).addClass(iconInactiveState)

      BUNN.closeDropdown($activeMenuContent)
    }
  })
})(window.BUNN = window.BUNN || {}, jQuery)
