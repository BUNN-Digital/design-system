;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.showDismissible = function (elem) {
    var storageId = $(elem).data('dismissible-id');
    var isDismissed = window.localStorage.getItem(storageId) != null;

    if (!isDismissed) {
      $(elem).fadeIn();
    }
  };

  BUNN.dismissDismissible = function ($elem) {
    var storageId = $elem.data('dismissible-id');
    $elem.hide();
    window.localStorage.setItem(storageId, 'dismissed');
  }; // -- Event Handlers -- //


  $('.js-show-dismissible').on('click', function () {
    var targetId = $(this).data('dismissible-target');
    var target = document.querySelectorAll("[data-dismissible-id='" + targetId + "']");
    BUNN.showDismissible(target);
  });
  $('.js-dismissible-trigger').on('click', function () {
    var $elem = $(this).closest('.js-dismissible');
    BUNN.dismissDismissible($elem);
  });
})(window.BUNN = window.BUNN || {}, jQuery);