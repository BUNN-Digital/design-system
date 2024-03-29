;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  // Convenient method to init any tabs with a
  // .active class. This is handy if .js-tab-content.active
  // is added to the dom dynamically before being made visible.
  BUNN.initTabs = (function () {
    $('.js-tab-content.active').each(function () {
      const $tabContent = $(this)
      const tabContentIsHidden = $tabContent.hasClass('hidden')

      if (tabContentIsHidden) {
        $tabContent.show()
      }
    })
  }())

  // -- Event Handlers -- //

  $('body').on('click', '.js-tab', function (e) {
    const $tab = $(this)
    const targetId = $tab.data('tab-content')
    const $target = $('#' + targetId)
    const $tabsContent = $target.closest('.js-tabs-content-container')

    e.preventDefault()

    $tabsContent.find('.js-tab-content').removeClass('active').hide()
    $tab.siblings().removeClass('active')

    $target.addClass('active').show()
    $tab.addClass('active').show()
  })

  // Do nothing if we click on an active tab
  $(document).on('click', function (e) {
    if ($(e.target).hasClass('js-tab.active')) {
      return false
    }
  })
})(window.BUNN = window.BUNN || {}, jQuery)
