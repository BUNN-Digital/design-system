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