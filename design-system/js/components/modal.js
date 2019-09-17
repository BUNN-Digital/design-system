;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.enableModal = function () {
    $('body').addClass('modal-open');
  };

  BUNN.disableModal = function () {
    $('body').removeClass('modal-open');
  };
})(window.BUNN = window.BUNN || {}, jQuery);