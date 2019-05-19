;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.initAccordion = function () {
    // If any accordion items load with a class of "open", make sure their content displays and icons are set accordingly
    $('.js-accordion-item.open').each(function () {
      BUNN.openAccordion($(this));
    });
  };

  BUNN.openAccordion = function ($target) {
    var $content = $target.find('.js-accordion-content');
    var $icon = $target.find('.js-accordion-icon');
    var iconInactiveClass = $icon.data('inactive-icon');
    var iconActiveClass = $icon.data('active-icon');
    var accordionImg = $target.data('accordion-img');
    $content.slideDown('fast');
    $target.addClass('open');
    $icon.removeClass(iconInactiveClass).addClass(iconActiveClass); // if this accordion has an image, show it

    if (accordionImg != null) {
      $('.js-featured-image').removeClass('active');
      $('#' + accordionImg).addClass('active');
    }
  };

  BUNN.closeAccordion = function ($target) {
    var $content = $target.find('.js-accordion-content');
    var $icon = $target.find('.js-accordion-icon');
    var iconInactiveClass = $icon.data('inactive-icon');
    var iconActiveClass = $icon.data('active-icon');
    var accordionImg = $target.data('accordion-img');
    console.log($target);
    console.log($content);
    $content.slideUp('fast');
    $target.removeClass('open');
    $icon.removeClass(iconActiveClass).addClass(iconInactiveClass);
  };
  /* 
   * @param $target $(.js-accordion-title)
   */


  BUNN.toggleAccordion = function ($target) {
    var $accordion = $target.closest('.js-accordion');
    var $openAccordionItem = $accordion.find('.js-accordion-item.open');
    var accordionImg = $target.data('accordion-img'); // if this item is not already open...

    if (!$target.hasClass('open')) {
      // close any siblings
      if ($openAccordionItem) {
        BUNN.closeAccordion($openAccordionItem);
      } // and open the target item


      BUNN.openAccordion($target); // if it IS already open...
    } else {
      //and doesn't have an image, close it
      if (!accordionImg) {
        BUNN.closeAccordion($target);
      }
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
  $('.js-accordion-title').click(function () {
    BUNN.toggleAccordion($(this).parent());
  });
  $('.js-content-expand-toggle').click(function () {
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


  $('.js-drawer-trigger').on('click', function () {
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
      console.log(window.innerWidth < BUNN.screens.md);

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