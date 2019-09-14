;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.openDrawer = target => {
    const $drawer = $('#' + target)
    $('body').addClass('drawer-open')
    $drawer.addClass('open')
  }

  BUNN.closeDrawer = ($openDrawer = $('.js-drawer.open')) => {
    $('body').removeClass('drawer-open')
    $openDrawer.removeClass('open')
  }

  // -- Event Handlers -- //

  $(document).on('click', '.js-drawer-trigger', function () {
    const targetDrawerId = $(this).data('drawer')
    BUNN.openDrawer(targetDrawerId)
  })

  $(document).on('click', '.js-drawer-close-btn', function () {
    BUNN.closeDrawer()
  })

  $(document).on('click', function (e) {
    if ($(e.target).hasClass('js-drawers')) {
      BUNN.closeDrawer()
    }
  })

  enquire.register('screen and (min-width: ' + BUNN.screensPx['sm-md'] + ' )', {
    match () {
      const $openDrawer = $('[data-hide-at="sm-md"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  }).register('screen and (min-width: ' + BUNN.screensPx.md + ' )', {
    match () {
      const $openDrawer = $('[data-hide-at="md"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  }).register('screen and (min-width: ' + BUNN.screensPx['md-lg'] + ' )', {
    match () {
      const $openDrawer = $('[data-hide-at="md-lg"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  }).register('screen and (min-width: ' + BUNN.screensPx.lg + ' )', {
    match () {
      const $openDrawer = $('[data-hide-at="lg"]')
      if ($openDrawer.length) BUNN.closeDrawer($openDrawer)
    }
  })
})(window.BUNN = window.BUNN || {}, jQuery)
