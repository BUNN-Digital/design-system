;

(function (BUNN, $, undefined) {
  // -- Global Methods -- //
  BUNN.initAccordion = function (e) {
    $('[class*=js-accordion].first .js-accordion-item:first-child').addClass('open');
    $('[class*=js-accordion].first .js-accordion-item:first-child .js-accordion-content').slideDown('fast');
  };

  BUNN.accordionToggle = function ($target) {
    if ($target.parent().hasClass('open')) {
      $target.next().slideUp('fast');
      $target.parent().removeClass('open');
    } else {
      $target.next().slideToggle('fast');
      $target.parent().toggleClass('open');
      $('.js-accordion .js-accordion-content').not($target.next()).slideUp('fast');
      $('.js-accordion .js-accordion-item').not($target.parent()).removeClass('open');
    }
  };

  BUNN.accordionImgToggle = function ($target) {
    var $activePanel = $target.attr('id');
    var $activeImage = 'img-' + $activePanel;

    if ($target.parent().hasClass('open')) {// Do nothing...keep panel open
    } else {
      $target.next().slideToggle('fast');
      $target.parent().toggleClass('open');
      $('.js-featured-image').each(function (index) {
        $(this).removeClass('active');
      });
      $('#' + $activeImage).addClass('active');
      $('.js-accordion-img .js-accordion-content').not($target.next()).slideUp('fast');
      $('.js-accordion-img .js-accordion-item').not($target.parent()).removeClass('open');
    }
  };

  BUNN.contentExpand = function ($content, $linkText, $maxHeight) {
    if ($linkText === 'Show more') {
      $('.js-content-expand-toggle').text('Show less');
      $content.addClass('open').css('max-height', $maxHeight);
    } else {
      $('.js-content-expand-toggle').text('Show more');
      $content.removeClass('open').css('max-height', '240px');
    }
  }; // -- Event Handlers -- //


  $('.js-accordion .js-accordion-title').click(function () {
    var $target = $(this);
    BUNN.accordionToggle($target);
  });
  $('.js-accordion-img .js-accordion-title').click(function () {
    var $target = $(this);
    BUNN.accordionImgToggle($target);
  });
  $('.js-content-expand-toggle').click(function () {
    var $content = $('.js-content-expand');
    var $linkText = this.innerText;
    var $maxHeight = $content.prop('scrollHeight');
    BUNN.contentExpand($content, $linkText, $maxHeight);
  });
})(window.BUNN = window.BUNN || {}, jQuery);