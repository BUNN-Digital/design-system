;(function (BUNN, $, undefined) {
  // -- Global Methods -- //

  BUNN.initAccordion = () => {
    // If any accordion items load with a class of "open", make sure their content displays and icons are set accordingly
    $('.js-accordion-item.open').each(function () {
      BUNN.openAccordion($(this))
    })

    $('.js-active-accordion-sub').each(function () {
      if ($(this).hasClass('js-accordion-item') && !$(this).hasClass('open')) {
        BUNN.openAccordion($(this).children('.js-accordion-title'))
      } else {
        BUNN.openAccordion($(this).closest('.js-accordion-item').children('.js-accordion-title'))
      }
    })
  }

  BUNN.openAccordion = $title => {
    const $accordionItem = $title.closest('.js-accordion-item')
    const $content = $accordionItem.children('.js-accordion-content')
    const $iconContainer = $title.children('.js-accordion-icon')
    const iconInactiveState = $iconContainer.data('inactive-icon')
    const iconActiveState = $iconContainer.data('active-icon')
    const accordionImg = $title.data('accordion-img')

    $content.slideDown('fast')
    $accordionItem.addClass('open active')

    const $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer)

    $icon.removeClass(iconInactiveState).addClass(iconActiveState)

    // if this accordion has an image, show it
    if (accordionImg != null) {
      $('.js-featured-image').removeClass('active')
      $('#' + accordionImg).addClass('active')
    }
  }

  BUNN.closeAccordion = $title => {
    const $accordionItem = $title.closest('.js-accordion-item')
    const $content = $accordionItem.children('.js-accordion-content')
    const $iconContainer = $title.find('.js-accordion-icon')
    const iconInactiveState = $iconContainer.data('inactive-icon')
    const iconActiveState = $iconContainer.data('active-icon')

    $content.slideUp('fast')
    $accordionItem.removeClass('open active')

    const $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer)

    $icon.removeClass(iconActiveState).addClass(iconInactiveState)
  }

  /*
     * @param $title $(.js-accordion-title)
     */
  BUNN.toggleAccordion = $title => {
    const $accordion = $title.closest('.js-accordion')
    const $accordionItem = $title.closest('.js-accordion-item')
    const $openAccordionItem = $accordion.children('.js-accordion-item.open')
    const accordionImg = $title.parent().data('accordion-img')

    // if this item is not already open...
    if (!$accordionItem.hasClass('open')) {
      // close any siblings
      if ($openAccordionItem) {
        BUNN.closeAccordion($openAccordionItem.children('.js-accordion-title'))
      }

      // and open the target item
      BUNN.openAccordion($title)

      // if it IS already open...
    } else {
      // and doesn't have an image, close it
      if (!accordionImg) {
        BUNN.closeAccordion($title)
      }
    }

    // toggle accordion image...
    if (accordionImg) {
      $(':not(#' + accordionImg).removeClass('active')
      $('#' + accordionImg).addClass('active')
    }
  }

  BUNN.contentExpand = ($content, $linkText, $maxHeight) => {
    if ($linkText === 'Show more') {
      $('.js-content-expand-toggle').text('Show less')
      $content.addClass('open active').css('max-height', $maxHeight)
    } else {
      $('.js-content-expand-toggle').text('Show more')
      $content.removeClass('open active').css('max-height', '240px')
    }
  }

  // -- Event Handlers -- //

  BUNN.initAccordion()

  $(document).on('click', '.js-accordion-title', function () {
    BUNN.toggleAccordion($(this))
  })

  $(document).on('click', '.js-content-expand-toggle', function () {
    const $content = $('.js-content-expand')
    const $linkText = this.innerText
    const $maxHeight = $content.prop('scrollHeight')
    BUNN.contentExpand($content, $linkText, $maxHeight)
  })
})(window.BUNN = window.BUNN || {}, jQuery)
