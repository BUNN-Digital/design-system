;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.openDrawer = target => {
    const $drawer = $('#' + target)
    const $closeBtn = $drawer.find('.js-drawer-close-btn')
    $('body').addClass('drawer-open')
    $drawer.addClass('drawer--open')
    $closeBtn.on('click', BUNN.closeDrawer)
  }

  BUNN.closeDrawer = ($openDrawer = $('.drawer--open')) => {
    $('body').removeClass('drawer-open')
    $openDrawer.removeClass('drawer--open')
  }

  // -- Event Handlers -- //

  $(document).on('click', '.js-drawer-trigger', function () {
    const targetDrawerId = $(this).data('drawer')
    BUNN.openDrawer(targetDrawerId)
  })

  $(document).on('click', function (e) {
    if ($(e.target).hasClass('js-drawers')) {
      BUNN.closeDrawer()
    }
  })

  enquire.register('screen and (min-width: ' + BUNN.screensPx['sm-md'] + ' )', {
    match: function () {
      const $openDrawer = $('[data-hide-at="sm-md"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  }).register('screen and (min-width: ' + BUNN.screensPx.md + ' )', {
    match: function () {
      const $openDrawer = $('[data-hide-at="md"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  }).register('screen and (min-width: ' + BUNN.screensPx['md-lg'] + ' )', {
    match: function () {
      const $openDrawer = $('[data-hide-at="md-lg"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  }).register('screen and (min-width: ' + BUNN.screensPx.lg + ' )', {
    match: function () {
      const $openDrawer = $('[data-hide-at="lg"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  })
})(window.BUNN = window.BUNN || {}, jQuery)
