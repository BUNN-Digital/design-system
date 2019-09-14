;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.expandCollapsible = ($parent, $content) => {
    $parent.removeClass('collapsed').addClass('expanded')
    $content.slideDown('fast')
  }

  BUNN.collapseCollapsible = ($parent, $content) => {
    $parent.removeClass('expanded').addClass('collapsed')
    $content.slideUp('fast')
  }

  // -- Event Handlers -- //

  $(document).on('click', '[data-collapsible-trigger]', function (e) {
    const $trigger = $(this)
    const $parent = $trigger.closest('[data-collapsible]')
    const target = $trigger.data('collapsible-target')
    const content = document.getElementById(target)

    if ($parent.hasClass('collapsed')) {
      BUNN.expandCollapsible($parent, $(content))
    } else {
      BUNN.collapseCollapsible($parent, $(content))
    }
  })
})(window.BUNN = window.BUNN || {}, jQuery)
