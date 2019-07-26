;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.initAccordion = function () {
    // If any accordion items load with a class of "open", make sure their content displays and icons are set accordingly
    $('.js-accordion-item.open').each(function () {
      BUNN.openAccordion($(this));
    });
    $('.js-active-accordion-sub').each(function () {
      if ($(this).hasClass('js-accordion-item') && !$(this).hasClass('open')) {
        BUNN.openAccordion($(this).children('.js-accordion-title'));
      } else {
        BUNN.openAccordion($(this).closest('.js-accordion-item').children('.js-accordion-title'));
      }
    });
  };

  BUNN.openAccordion = function ($title) {
    var $accordionItem = $title.closest('.js-accordion-item');
    var $content = $accordionItem.children('.js-accordion-content');
    var $iconContainer = $title.children('.js-accordion-icon');
    var iconInactiveState = $iconContainer.data('inactive-icon');
    var iconActiveState = $iconContainer.data('active-icon');
    var accordionImg = $title.data('accordion-img');
    $content.slideDown('fast');
    $accordionItem.addClass('open');
    var $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer);
    $icon.removeClass(iconInactiveState).addClass(iconActiveState); // if this accordion has an image, show it

    if (accordionImg != null) {
      $('.js-featured-image').removeClass('active');
      $('#' + accordionImg).addClass('active');
    }
  };

  BUNN.closeAccordion = function ($title) {
    var $accordionItem = $title.closest('.js-accordion-item');
    var $content = $accordionItem.children('.js-accordion-content');
    var $iconContainer = $title.find('.js-accordion-icon');
    var iconInactiveState = $iconContainer.data('inactive-icon');
    var iconActiveState = $iconContainer.data('active-icon');
    $content.slideUp('fast');
    $accordionItem.removeClass('open');
    var $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer);
    $icon.removeClass(iconActiveState).addClass(iconInactiveState);
  };
  /* 
   * @param $title $(.js-accordion-title)
   */


  BUNN.toggleAccordion = function ($title) {
    var $accordion = $title.closest('.js-accordion');
    var $accordionItem = $title.closest('.js-accordion-item');
    var $openAccordionItem = $accordion.children('.js-accordion-item.open');
    var accordionImg = $title.parent().data('accordion-img'); // if this item is not already open...

    if (!$accordionItem.hasClass('open')) {
      // close any siblings
      if ($openAccordionItem) {
        BUNN.closeAccordion($openAccordionItem.children('.js-accordion-title'));
      } // and open the target item


      BUNN.openAccordion($title); // if it IS already open...
    } else {
      //and doesn't have an image, close it
      if (!accordionImg) {
        BUNN.closeAccordion($title);
      }
    } // toggle accordion image...


    if (accordionImg) {
      $(':not(#' + accordionImg).removeClass('active');
      $('#' + accordionImg).addClass('active');
    }
  };

  BUNN.contentExpand = function ($content, $linkText, $maxHeight) {
    if ($linkText === 'Show more') {
      $('.js-content-expand-toggle').text('Show less');
      $content.addClass('open').css('max-height', $maxHeight);
    } else {
      $('.js-content-expand-toggle').text('Show more');
      $content.removeClass('open').css('max-height', '240px');
    }
  }; // -- Event Handlers -- //


  BUNN.initAccordion();
  $(document).on('click', '.js-accordion-title', function () {
    BUNN.toggleAccordion($(this));
  });
  $(document).on('click', '.js-content-expand-toggle', function () {
    var $content = $('.js-content-expand');
    var $linkText = this.innerText;
    var $maxHeight = $content.prop('scrollHeight');
    BUNN.contentExpand($content, $linkText, $maxHeight);
  });
})(window.BUNN = window.BUNN || {}, jQuery);
;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.expandCollapsible = function ($parent, $content) {
    $parent.removeClass('collapsed').addClass('expanded');
    $content.slideDown('fast');
  };

  BUNN.collapseCollapsible = function ($parent, $content) {
    $parent.removeClass('expanded').addClass('collapsed');
    $content.slideUp('fast');
  }; // -- Event Handlers -- //


  $(document).on('click', '[data-collapsible-trigger]', function (e) {
    var $trigger = $(this);
    var $parent = $trigger.closest('[data-collapsible]');
    var target = $trigger.data('collapsible-target');
    var content = document.getElementById(target);

    if ($parent.hasClass('collapsed')) {
      BUNN.expandCollapsible($parent, $(content));
    } else {
      BUNN.collapseCollapsible($parent, $(content));
    }
  });
})(window.BUNN = window.BUNN || {}, jQuery);
;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.showDismissible = function (elem) {
    var storageId = $(elem).data('dismissible-id');
    var isDismissed = window.localStorage.getItem(storageId) != null;

    if (!isDismissed) {
      $(elem).fadeIn();
    }
  };

  BUNN.dismissDismissible = function ($elem) {
    var storageId = $elem.data('dismissible-id');
    $elem.hide();
    window.localStorage.setItem(storageId, 'dismissed');
  }; // -- Event Handlers -- //


  $('.js-show-dismissible').on('click', function () {
    var targetId = $(this).data('dismissible-target');
    var target = document.querySelectorAll("[data-dismissible-id='" + targetId + "']");
    BUNN.showDismissible(target);
  });
  $('.js-dismissible-trigger').on('click', function () {
    var $elem = $(this).closest('.js-dismissible');
    BUNN.dismissDismissible($elem);
  });
})(window.BUNN = window.BUNN || {}, jQuery);
;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.openDrawer = function (target) {
    var $drawer = $('#' + target);
    var $closeBtn = $drawer.find('.js-drawer-close-btn');
    $('body').addClass('drawer-open');
    $drawer.addClass('drawer--open');
    $closeBtn.on('click', BUNN.closeDrawer);
  };

  BUNN.closeDrawer = function () {
    var $openDrawer = $('.drawer--open');

    if ($openDrawer) {
      $('body').removeClass('drawer-open');
      $openDrawer.removeClass('drawer--open');
    }
  }; // -- Event Handlers -- //


  $(document).on('click', '.js-drawer-trigger', function () {
    var targetDrawerId = $(this).data('drawer');
    BUNN.openDrawer(targetDrawerId);
  });
  $(document).on('click', function (e) {
    var $drawer = $('.drawer--open');

    if ($(e.target).hasClass('js-drawers')) {
      BUNN.closeDrawer();
    }
  }); // Re-position elements for screen size

  enquire.register("screen and (min-width: 1200px)", {
    match: function match() {
      BUNN.closeDrawer();
    }
  });
})(window.BUNN = window.BUNN || {}, jQuery);
;

(function (window, $, undefined) {
  var $navItemTrigger = $('.js-dropdown-menu-trigger');
  var $navMenuItems = $('.js-dropdown-menu-item');
  var $navMenuItemsContent = $('.js-dropdown-menu-content');

  BUNN.closeDropdown = function ($menu) {
    if (window.innerWidth < BUNN.screens.lg) {
      $menu.slideUp('fast');
    } else {
      $menu.fadeOut('fast');
    }
  };

  BUNN.openDropdown = function ($menu) {
    if (window.innerWidth < BUNN.screens.lg) {
      $menu.slideDown('fast');
    } else {
      $menu.fadeIn('fast');
    }
  }; //Trigger on click


  $navItemTrigger.on('click', function (e) {
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
  $(document).on('mousedown', function (e) {
    var $activeDropdown = $('.js-dropdown-menu-item.open');

    if ($activeDropdown.length && !$(e.target).closest('.js-dropdown-menu-item').length && !$(e.target).closest('.js-drawer').length) {
      var $activeMenuContent = $activeDropdown.find('.js-dropdown-menu-content');
      $navMenuItems.removeClass('open');
      BUNN.closeDropdown($activeMenuContent);
    }
  });
})(window, jQuery);
// JS Popup Menu
// Menu that acts like a popup/modal on mobile and a dropdown on desktop
// ==========================================================================================
;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  $(".js-popup-menu__content-container").css("display", "none"); // Append to body on load

  enquire.register("screen and (min-width: " + BUNN.screens.md + "px)", {
    setup: function setup() {
      $(".js-popup-menu--hybrid").appendTo("body");
    },
    match: function match() {
      $("body > .js-popup-menu__content-container").each(function () {
        var menuId = $(this).attr('id');
        var $parent = $('[data-popup-menu="' + menuId + '"]');
        $(this).appendTo($parent);
        $('body').removeClass('h-full overflow-hidden');
      });
    },
    unmatch: function unmatch() {
      $(".js-popup-menu--hybrid").appendTo("body");
    }
  });

  BUNN.closePopupMenu = function () {
    var $popupMenuToggle = $('.js-popup-menu__toggle.dropdown-open');
    var popupMenuId = $popupMenuToggle.closest('.popup-menu').data("popup-menu");
    $popupMenuToggle.removeClass("dropdown-open");
    $('#' + popupMenuId).removeClass("visible").css("display", "none");
    $('body').removeClass('h-full overflow-hidden');
  }; // -- Event Handlers -- //
  // Close menu when clicking close button


  $(".js-popup-menu-close").on("click", function (e) {
    e.preventDefault();
    BUNN.closePopupMenu();
  }); // Show/hide menu when clicking menu toggle trigger

  $(".js-popup-menu__toggle").on("click", function (e) {
    var $popupMenuToggle = $(this);
    var popupMenuId = $popupMenuToggle.closest('.popup-menu').data("popup-menu");
    var $popupMenu = $("#" + popupMenuId);
    var menuIsHybrid = $popupMenu.hasClass('js-popup-menu--hybrid');
    var dropdownIsOpen = $popupMenuToggle.hasClass("dropdown-open");
    e.preventDefault();
    e.stopPropagation(); // Close any open popup menus

    BUNN.closePopupMenu();

    if (!dropdownIsOpen) {
      $popupMenu.css("display", "block").addClass("visible");
      $(this).addClass("dropdown-open");

      if (menuIsHybrid && window.innerWidth < BUNN.screens.md) {
        $('body').addClass('h-full overflow-hidden');
      }
    } else {
      $popupMenu.css("display", "none").removeClass("visible");
      $(this).removeClass("dropdown-open");
    } // listen for a click on the document so we can close the menu by clicking outside of it


    $(document).on("click", function (e) {
      // if we didn"t click on the dropdown menu, close it if it"s open
      if (!$(e.target).closest($popupMenu).length) {
        if ($popupMenu.is(":visible") && !dropdownIsOpen) {
          BUNN.closePopupMenu();
        }
      }
    });
  });
})(window.BUNN = window.BUNN || {}, jQuery);
;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  // Convenient method to init any tabs with a 
  // .active class. This is handy if .js-tab-content.active
  // is added to the dom dynamically before being made visible.
  BUNN.initTabs = function () {
    $('.js-tab-content.active').each(function () {
      var $tabContent = $(this);
      var tabContentIsHidden = $tabContent.hasClass('hidden');

      if (tabContentIsHidden) {
        $tabContent.show();
      }
    });
  }(); // -- Event Handlers -- //


  $('body').on('click', '.js-tab', function (e) {
    var $tab = $(this);
    var targetId = $tab.data('tab-content');
    var $target = $('#' + targetId);
    var $tabsContent = $target.closest('.js-tabs-content-container');
    e.preventDefault();
    $tabsContent.find('.js-tab-content').removeClass('active').hide();
    $tab.siblings().removeClass('active');
    $target.addClass('active').show();
    $tab.addClass('active').show();
  }); // Do nothing if we click on an active tab

  $(document).on('click', function (e) {
    if ($(e.target).hasClass('js-tab.active')) {
      return false;
    }
  });
})(window.BUNN = window.BUNN || {}, jQuery);