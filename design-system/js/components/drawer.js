;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.openDrawer = function ($drawer) {
    $('body').addClass('drawer-open');
    $drawer.addClass('open');
  };

  BUNN.closeDrawer = function ($drawer) {
    $('body').removeClass('drawer-open');
    $drawer.removeClass('open');
  }; // -- Event Handlers -- //


  $(document).on('click', '.js-drawer-trigger', function () {
    var targetDrawerId = $(this).data('drawer');
    var $drawer = $('#' + targetDrawerId);
    BUNN.openDrawer($drawer);
  });
  $(document).on('click', '.js-drawer-close-btn', function () {
    var $drawer = $('.js-drawer.open');
    BUNN.closeDrawer($drawer);
  });
  $(document).on('click', function (e) {
    if ($(e.target).hasClass('js-drawers')) {
      var $drawer = $('.js-drawer.open');
      BUNN.closeDrawer($drawer);
    }
  });
  enquire.register(BUNN.enquire.sm, function () {
    var $drawer = $('.js-drawer.open[data-hide-at="sm"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  }).register(BUNN.enquire['sm-md'], function () {
    var $drawer = $('.js-drawer.open[data-hide-at="sm-md"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  }).register(BUNN.enquire.md, function () {
    var $drawer = $('.js-drawer.open[data-hide-at="md"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  }).register(BUNN.enquire['md-lg'], function () {
    var $drawer = $('.js-drawer.open[data-hide-at="md-lg"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  }).register(BUNN.enquire.lg, function () {
    var $drawer = $('.js-drawer.open[data-hide-at="lg"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  }).register(BUNN.enquire['lg-xl'], function () {
    var $drawer = $('.js-drawer.open[data-hide-at="lg-xl"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  }).register(BUNN.enquire.xl, function () {
    var $drawer = $('.js-drawer.open[data-hide-at="xl"]');
    if ($drawer.length) BUNN.closeDrawer($drawer);
  });
})(window.BUNN = window.BUNN || {}, jQuery);