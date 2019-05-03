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