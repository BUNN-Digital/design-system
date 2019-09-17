;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.enableModal = () => {
    $('body').addClass('modal-open')
  }

  BUNN.disableModal = () => {
    $('body').removeClass('modal-open')
  }
})(window.BUNN = window.BUNN || {}, jQuery)
