;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.showDismissible = elem => {
    const storageId = $(elem).data('dismissible-id')
    const isDismissed = window.localStorage.getItem(storageId) != null

    if (!isDismissed) {
      $(elem).fadeIn()
    }
  }

  BUNN.dismissDismissible = $elem => {
    const storageId = $elem.data('dismissible-id')

    $elem.hide()
    window.localStorage.setItem(storageId, 'dismissed')
  }

  // -- Event Handlers -- //

  $('.js-show-dismissible').on('click', function () {
    const targetId = $(this).data('dismissible-target')
    const target = document.querySelectorAll("[data-dismissible-id='" + targetId + "']")

    BUNN.showDismissible(target)
  })

  $('.js-dismissible-trigger').on('click', function () {
    const $elem = $(this).closest('.js-dismissible')
    BUNN.dismissDismissible($elem)
  })
})(window.BUNN = window.BUNN || {}, jQuery)
