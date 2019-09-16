;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.openDrawer = $drawer => {
    $('body').addClass('drawer-open')
    $drawer.addClass('open')
  }

  BUNN.closeDrawer = $drawer => {
    $('body').removeClass('drawer-open')
    $drawer.removeClass('open')
  }

  // -- Event Handlers -- //

  $(document).on('click', '.js-drawer-trigger', function () {
    const targetDrawerId = $(this).data('drawer')
    const $drawer = $('#' + targetDrawerId)
    BUNN.openDrawer($drawer)
  })

  $(document).on('click', '.js-drawer-close-btn', function () {
    const $drawer = $('.js-drawer.open')
    BUNN.closeDrawer($drawer)
  })

  $(document).on('click', function (e) {
    if ($(e.target).hasClass('js-drawers')) {
      const $drawer = $('.js-drawer.open')
      BUNN.closeDrawer($drawer)
    }
  })

  enquire
    .register(BUNN.enquire.sm, function () {
      const $drawer = $('.js-drawer.open[data-hide-at="sm"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
    .register(BUNN.enquire['sm-md'], function () {
      const $drawer = $('.js-drawer.open[data-hide-at="sm-md"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
    .register(BUNN.enquire.md, function () {
      const $drawer = $('.js-drawer.open[data-hide-at="md"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
    .register(BUNN.enquire['md-lg'], function () {
      const $drawer = $('.js-drawer.open[data-hide-at="md-lg"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
    .register(BUNN.enquire.lg, function () {
      const $drawer = $('.js-drawer.open[data-hide-at="lg"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
    .register(BUNN.enquire['lg-xl'], function () {
      const $drawer = $('.js-drawer.open[data-hide-at="lg-xl"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
    .register(BUNN.enquire.xl, function () {
      const $drawer = $('.js-drawer.open[data-hide-at="xl"]')
      if ($drawer.length) BUNN.closeDrawer($drawer)
    })
})(window.BUNN = window.BUNN || {}, jQuery)
